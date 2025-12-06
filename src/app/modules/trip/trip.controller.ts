import type { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { TripServices } from "./trip.service";
import type { IVerifiedUser } from "../../interfaces/verfiedUser";

const createNewTrip = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const body = JSON.parse(req.body.data);
    const activities = body.activities.split(",");
    const itinerary = JSON.stringify(body.itinerary);
    const reqBody = {
      ...body,
      activities,
      itinerary,
      userId: req?.user?.userId,
    };
    const files = req.files as Express.Multer.File[];
    const images = files.map((file) => file.path);
    const result = await TripServices.createNewTrip(reqBody, images);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Trip created successfuly!",
      data: result,
    });
  }
);

const getAllTrip = catchAsync(async (req: Request, res: Response) => {
  const result = await TripServices.getAllTrip();
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

export const TripControllers = {
  createNewTrip,
  getAllTrip,
  tripById,
};
