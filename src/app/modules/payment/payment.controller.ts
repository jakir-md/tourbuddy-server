import type { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { PaymentServices } from "./payment.service";
import { EnvVars } from "../../../config/env";

const paymentSuccess = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as Record<string, string>;
  const result = await PaymentServices.paymentSuccess(query);

  if (result.success) {
    res.redirect(
      `${EnvVars.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&amount=${query.amount}&status=${query.status}`
    );
  }
});

const paymentFail = catchAsync(async (req: Request, res: Response) => {
  const query = req.query as Record<string, string>;
  const result = await PaymentServices.paymentFail(query);
  if (result.success) {
    res.redirect(
      `${EnvVars.SSL_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&amount=${query.amount}&status=${query.status}`
    );
  }
});

export const PaymentControllers = {
  paymentSuccess,
  paymentFail,
};
