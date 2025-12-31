import catchAsync from "../../../shared/catchAsync";
import { PaymentServices } from "./payment.service";
import { EnvVars } from "../../../config/env";
const paymentSuccess = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await PaymentServices.paymentSuccess(query);
    if (result.success) {
        res.redirect(`${EnvVars.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&amount=${query.amount}&status=${query.status}`);
    }
});
const paymentFail = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await PaymentServices.paymentFail(query);
    if (result.success) {
        res.redirect(`${EnvVars.SSL_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&amount=${query.amount}&status=${query.status}`);
    }
});
export const PaymentControllers = {
    paymentSuccess,
    paymentFail,
};
//# sourceMappingURL=payment.controller.js.map