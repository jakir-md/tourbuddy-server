import type { Request, Response } from "express";
import httpStatus from "http-status";
import { UserServices } from "./user.service";
import sendResponse from "../../../../shared/sendResponse";
import catchAsync from "../../../../shared/catchAsync";

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

export const UserControllers = {
  registerUser,
};