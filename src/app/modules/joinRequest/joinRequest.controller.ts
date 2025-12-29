import type { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { JoinRequestServices } from "./joinRequest.service";
import type { IVerifiedUser } from "../../interfaces/verfiedUser";

const getStatus = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const { tripId } = req.body;
    const userId = req.user?.userId as string;
    const result = await JoinRequestServices.getStatus(userId, tripId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Subscription Payment Completed successfuly!",
      data: result,
    });
  }
);

const acceptRequestForJoining = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const { tripId, userId } = req.body;
    const adminId = req.user?.userId as string;
    const result = await JoinRequestServices.acceptRequestForJoining(
      userId,
      tripId,
      adminId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: result.success,
      message: "Request Accepted successfuly!",
      data: null,
    });
  }
);

const rejectJoinRequest = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const { userId, tripId } = req.body;
    const adminId = req.user?.userId as string;
    const result = await JoinRequestServices.rejectJoinRequest(
      userId,
      tripId,
      adminId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Request Granted successfuly!",
      data: result,
    });
  }
);

const requestForJoining = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const { tripId, adminId } = req.body;
    const userId = req.user?.userId as string;
    const result = await JoinRequestServices.requestForJoining(
      userId,
      tripId,
      adminId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Request Granted successfuly!",
      data: result,
    });
  }
);

const gtAllRequests = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const adminId = req.user?.userId as string;
    console.log("adminID", adminId);
    const result = await JoinRequestServices.gtAllRequests(adminId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Request Granted successfuly!",
      data: result,
    });
  }
);

const joinedUserProfiles = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const userId = req.params.slug as string;
    const result = await JoinRequestServices.joinedUserProfiles(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Profile Trips fetched successfuly!",
      data: result,
    });
  }
);

const joinedTrips = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const userId = req.user?.userId as string;
    const result = await JoinRequestServices.joinedTrips(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Trips joined by me retrieved successfuly!",
      data: result,
    });
  }
);

export const JoinRequestControllers = {
  getStatus,
  acceptRequestForJoining,
  rejectJoinRequest,
  requestForJoining,
  gtAllRequests,
  joinedUserProfiles,
  joinedTrips,
};
