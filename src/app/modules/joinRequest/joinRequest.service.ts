import { prisma } from "../../../../lib/prisma";
import ApiError from "../../error/ApiError";
import statusCode from "http-status";

const getStatus = async (userId: string, planId: string) => {
  try {
    const result = await prisma.joinRequest.findFirst({
      where: {
        userId,
        tripId: planId,
      },
    });
    return result;
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

const acceptRequestForJoining = async (
  userId: string,
  tripId: string,
  adminId: string
) => {
  try {
    const result = await prisma.joinRequest.findFirst({
      where: {
        userId,
        tripId,
      },
    });

    if (result) {
      throw new ApiError(statusCode.BAD_REQUEST, "Join Request Not Found");
    }

    const join = await prisma.$transaction(async (tnx) => {
      const conversationExists = await tnx.conversation.findFirst({
        where: {
          adminId,
          tripId,
        },
      });

      if (!conversationExists) {
        const conversationCreate = await tnx.conversation.create({
          data: {
            adminId,
            tripId,
          },
        });

        const memberData = [
          { userId: adminId, conversationId: conversationCreate.id },
          { userId: userId, conversationId: conversationCreate.id },
        ];

        const memberAdd = await tnx.conversationMember.createMany({
          data: memberData,
        });
      } else {
        const memberAdd = await tnx.conversationMember.create({
          data: {
            userId: userId,
            conversationId: conversationExists.id,
          },
        });
      }
    });
    return {
      success: true,
    };
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

const updateJoinRequest = async (userId: string, planId: string) => {
  try {
    const result = await prisma.plan.create({
      data: payload,
    });
    return result;
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

export const JoinRequestServices = {
  getStatus,
  acceptRequestForJoining,
  updateJoinRequest,
};
