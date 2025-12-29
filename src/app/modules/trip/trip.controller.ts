import type { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { TripServices } from "./trip.service";
import type { IVerifiedUser } from "../../interfaces/verfiedUser";
import { tripFilterableFields } from "./trip.constants";
import pick from "../../helpers/pick";

const createNewTrip = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    // const body = JSON.parse(req.body.data);
    // const activities = body.activities.split(",");
    const body = req.body;
    // const itinerary = JSON.stringify(body.itinerary);
    const reqBody = {
      ...body,
      // itinerary,
      userId: req?.user?.userId,
    };
    // const files = req.files as Express.Multer.File[];
    // const images = files.map((file) => file.path);
    console.log("req body", reqBody);
    const result = await TripServices.createNewTrip(reqBody);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Trip created successfuly!",
      data: null,
    });
  }
);

const getAllTrip = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, tripFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await TripServices.getAllTrip(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Trips fetched successfuly!",
    data: result,
  });
});

const tripById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await TripServices.tripById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trip fetched successfuly!",
    data: result,
  });
});

const uploadImage = catchAsync(async (req: Request, res: Response) => {
  const result = req.file?.path;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Trip fetched successfuly!",
    data: result,
  });
});

const fetchTripsForApproval = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TripServices.fetchTripsForApproval();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Trip approvals fetched successfuly!",
      data: result,
    });
  }
);

const fetchUserAllTrips = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const userId = req.user?.userId as string;
    const result = await TripServices.fetchUserAllTrips(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Trip approvals fetched successfuly!",
      data: result,
    });
  }
);

const updateStatus = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const moderatorId = req.user?.userId;
    const payload = { ...req.body, moderatorId };
    console.log("paylaod", payload);
    const result = await TripServices.updateStatus(payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Trip Status updated successfuly!",
      data: result,
    });
  }
);

const reviewableTrips = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const tripAdminId = req.params?.adminId as string;
    const attendeeId = req.user?.userId as string;
    console.log({ tripAdminId, attendeeId });
    const result = await TripServices.reviewableTrips({
      tripAdminId,
      attendeeId,
    });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Reviewable trips fetched successfuly!",
      data: result,
    });
  }
);

const allReviews = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const targetId = req.params?.id as string;
    const result = await TripServices.allReviews(targetId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Reviews Retrieved successfuly!",
      data: result,
    });
  }
);

const postReview = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const authorId = req?.user?.userId as string;
    const payload = { ...req.body, authorId };
    const result = await TripServices.postReview(payload);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review posted successfuly!",
      data: result,
    });
  }
);

const allStartPoint = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const result = await TripServices.allStartPoint();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Trip Status updated successfuly!",
      data: result,
    });
  }
);

const fetchUserTripForProfile = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const userId = req.params.id as string;
    const result = await TripServices.fetchUserTripForProfile(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Profile Trips fetched successfuly!",
      data: result,
    });
  }
);

export const TripControllers = {
  createNewTrip,
  getAllTrip,
  tripById,
  uploadImage,
  fetchTripsForApproval,
  updateStatus,
  fetchUserAllTrips,
  allStartPoint,
  reviewableTrips,
  allReviews,
  fetchUserTripForProfile,
  postReview,
};
