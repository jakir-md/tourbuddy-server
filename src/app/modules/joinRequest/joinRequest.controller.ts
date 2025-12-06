import type { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { JoinRequestServices } from "./joinRequest.service";
import type { IVerifiedUser } from "../../interfaces/verfiedUser";

const getStatus = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const { planId } = req.body;
    const userId = req.user?.userId as string;
    const result = await JoinRequestServices.getStatus(userId, planId);
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

const updateJoinRequest = catchAsync(async (req: Request, res: Response) => {
  const { userId, planId } = req.body;
  const result = await JoinRequestServices.updateJoinRequest(userId, planId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Request Granted successfuly!",
    data: result,
  });
});

export const JoinRequestControllers = {
  getStatus,
  acceptRequestForJoining,
  updateJoinRequest,
};
