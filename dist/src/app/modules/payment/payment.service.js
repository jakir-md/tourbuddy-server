import { prisma } from "../../../../lib/prisma";
import ApiError from "../../error/ApiError";
import statusCode from "http-status";
const paymentSuccess = async (query) => {
    const { transactionId } = query;
    try {
        const result = await prisma.$transaction(async (tnx) => {
            const transaction = await tnx.payment.findUniqueOrThrow({
                where: {
                    transactionId: transactionId,
                },
            });
            const plan = await tnx.plan.findFirst({
                where: {
                    id: transaction.planId,
                },
            });
            if (!plan) {
                throw new ApiError(statusCode.BAD_REQUEST, "Plan Not Found");
            }
            await tnx.payment.update({
                where: {
                    transactionId: transactionId,
                },
                data: {
                    status: "SUCCESS",
                },
            });
            const isPreviousPlanExists = await tnx.subscription.findFirst({
                where: {
                    userId: transaction.userId,
                },
            });
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + plan.durationInDays);
            if (isPreviousPlanExists) {
                return await tnx.subscription.update({
                    where: {
                        userId: transaction.userId,
                    },
                    data: {
                        planId: transaction.planId,
                        endDate,
                    },
                });
            }
            return await tnx.subscription.create({
                data: {
                    userId: transaction.userId,
                    planId: transaction.planId,
                    endDate,
                },
            });
        });
        return { success: true };
    }
    catch (error) {
        throw new ApiError(statusCode.BAD_REQUEST, "Payment Success Error");
    }
};
const paymentFail = async (query) => {
    const { transactionId } = query;
    try {
        const result = await prisma.$transaction(async (tnx) => {
            const transaction = await tnx.payment.findUniqueOrThrow({
                where: {
                    transactionId: transactionId,
                },
            });
            const plan = await tnx.plan.findFirst({
                where: {
                    id: transaction.planId,
                },
            });
            if (!plan) {
                throw new ApiError(statusCode.BAD_REQUEST, "Plan Not Found");
            }
            return await tnx.payment.update({
                where: {
                    id: transaction.id,
                },
                data: {
                    status: "FAILED",
                },
            });
        });
        return { success: true };
    }
    catch (error) {
        throw new ApiError(statusCode.BAD_REQUEST, "Payment Fail Error");
    }
};
export const PaymentServices = {
    paymentSuccess,
    paymentFail,
};
//# sourceMappingURL=payment.service.js.map