import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../../shared/catchAsync";
import { sendResponse } from "../../../../shared/sendResponse";
import { UserServices } from "./user.service";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const payload = { ...req.body, profilePhoto: req?.file?.path };
  await UserServices.registerUser(payload);
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
