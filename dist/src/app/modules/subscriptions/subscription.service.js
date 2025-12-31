import statusCode from "http-status";
import bcrypt from "bcryptjs";
import { EnvVars } from "../../../config/env";
import { prisma } from "../../../../lib/prisma";
import ApiError from "../../error/ApiError";
import { getTransactionId } from "../../helpers/getTransactionId";
import { sslPaymentInit } from "../sslCommerz/sslCommerz.service";
const createNewSubscriptionPlan = async (payload) => {
    try {
        const result = await prisma.plan.create({
            data: payload,
        });
        return result;
    }
    catch (error) {
        throw new ApiError(statusCode.BAD_REQUEST, error.message);
    }
};
const getAllPlans = async () => {
    try {
        const result = await prisma.plan.findMany();
        return result;
    }
    catch (error) {
        throw new ApiError(statusCode.BAD_REQUEST, error.message);
    }
};
const upgradeSubscription = async ({ planId, userId, amount, }) => {
    const isUserExists = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
    });
    if (!isUserExists) {
        throw new ApiError(statusCode.BAD_REQUEST, "User Not Found");
    }
    const transactionId = getTransactionId();
    try {
        const result = await prisma.payment.create({
            data: {
                planId,
                userId,
                amount,
                transactionId,
            },
        });
        const sslPayload = {
            address: "Address",
            amount,
            transactionId: result.transactionId,
            email: isUserExists.email,
            name: isUserExists.name,
        };
        const sslpayment = await sslPaymentInit(sslPayload);
        return {
            paymentURL: sslpayment.GatewayPageURL,
        };
    }
    catch (error) {
        throw new ApiError(statusCode.BAD_REQUEST, error.message);
    }
};
export const SubscriptionServices = {
    createNewSubscriptionPlan,
    upgradeSubscription,
    getAllPlans,
};
//# sourceMappingURL=subscription.service.js.map