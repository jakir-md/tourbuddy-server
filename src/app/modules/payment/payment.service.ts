import statusCode from "http-status";
import bcrypt from "bcryptjs";
import { EnvVars } from "../../../config/env";
import { prisma } from "../../../../lib/prisma";
import ApiError from "../../error/ApiError";

const paymentSuccess = async (query: Record<string, string>) => {
  const { transactionId } = query;
  try {
    const result = await prisma.$transaction(async (tnx) => {
      const transaction = await tnx.payment.findUniqueOrThrow({
        where: {
          transactionId: transactionId as string,
        },
      });

      const plan = await tnx.plan.findFirstOrThrow({
        where: {
          id: transaction.planId,
        },
      });

      await tnx.payment.update({
        where: {
          transactionId: transactionId as string,
        },
        data: {
          status: "SUCCESS",
        },
      });

      const isPreviousPlanExists = await tnx.subscription.findFirstOrThrow({
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

    return result;
  } catch (error) {
    throw error;
  }
};

const paymentFail = async () => {
  return {};
};

export const PaymentServices = {
  paymentSuccess,
  paymentFail,
};
