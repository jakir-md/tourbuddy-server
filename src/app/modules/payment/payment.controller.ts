import type { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PaymentServices } from "./payment.service";

const paymentSuccess = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as Record<string, string>;
  const result = await PaymentServices.paymentSuccess(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subscription Payment Completed successfuly!",
    data: null,
  });
});

const paymentFail = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentServices.paymentFail();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Subscription Payment Failed!",
    data: null,
  });
});

export const PaymentControllers = {
  paymentSuccess,
  paymentFail,
};
