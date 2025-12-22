import type { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import type { IVerifiedUser } from "../../interfaces/verfiedUser";
import { ChatServices } from "./chat.service";

const getMyConversations = catchAsync(
  async (req: Request & { user?: IVerifiedUser }, res: Response) => {
    const userId = req.user?.userId as string;
    const result = await ChatServices.getMyConversations(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Conversations fetched successfuly!",
      data: result,
    });
  }
);

export const ChatControllers = {
  getMyConversations,
};
