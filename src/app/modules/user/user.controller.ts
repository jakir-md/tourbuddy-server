import type { Request, Response } from "express";
import httpStatus from "http-status";
import { UserServices } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import type { IVerifiedUser } from "../../interfaces/verfiedUser";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const reqBody = JSON.parse(req.body.data);
  const payload = { ...reqBody, profilePhoto: req?.file?.path };
  console.log("payload", payload);
  const result = await UserServices.registerUser(payload);
  console.log("register result", result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created successfuly!",
    data: null,
  });
});

const userInfoById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await UserServices.userInfoById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User info retrieved successfuly!",
    data: result,
  });
});

const verifyWithKYC = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const userId = req.user?.userId;
    const result = await UserServices.verifyWithKYC({ ...req.body, userId });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Verification Requested successfuly!",
      data: result,
    });
  }
);

const verificationStatus = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const userId = req.user?.userId as string;
    const result = await UserServices.verificationStatus(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Verification status retrieved successfuly!",
      data: result,
    });
  }
);

const getAllVerifyRequests = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const result = await UserServices.getAllVerifyRequests();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Verification requests retrieved successfuly!",
      data: result,
    });
  }
);

const updateVerifyRequest = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const moderatorId = req.user?.userId as string;
    const body = { ...req.body, moderatorId };
    const result = await UserServices.updateVerifyRequests(body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Verification requests retrieved successfuly!",
      data: result,
    });
  }
);

export const UserControllers = {
  registerUser,
  userInfoById,
  verifyWithKYC,
  verificationStatus,
  getAllVerifyRequests,
  updateVerifyRequest,
};
