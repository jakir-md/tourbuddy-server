import { RequestStatus } from "../../../../generated/prisma/enums";
import { prisma } from "../../../../lib/prisma";
import ApiError from "../../error/ApiError";
import statusCode from "http-status";

const getStatus = async (userId: string, tripId: string) => {
  try {
    const result = await prisma.joinRequest.findFirst({
      where: {
        attendeeId: userId,
        tripId,
      },
    });
    return result;
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

//another business logic: checking his current subscription plans information
//for eligibility
const acceptRequestForJoining = async (
  userId: string,
  tripId: string,
  adminId: string
) => {
  try {
    const result = await prisma.joinRequest.findFirst({
      where: {
        tripAdminId: adminId,
        tripId,
        attendeeId: userId,
        status: RequestStatus.PENDING,
      },
      include: {
        trip: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!result) {
      throw new ApiError(statusCode.BAD_REQUEST, "Join Request Not Found");
    }

    const join = await prisma.$transaction(async (tnx) => {
      await tnx.joinRequest.update({
        where: {
          tripId_attendeeId_tripAdminId: {
            tripId,
            attendeeId: userId,
            tripAdminId: adminId,
          },
        },
        data: {
          status: RequestStatus.ACCEPTED,
        },
      });

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
            name: result.trip.slug,
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

const requestForJoining = async (
  userId: string,
  tripId: string,
  adminId: string
) => {
  try {
    const request = await prisma.joinRequest.findFirst({
      where: {
        attendeeId: userId,
        tripId,
        tripAdminId: adminId,
      },
    });

    if (request) {
      throw new ApiError(statusCode.BAD_REQUEST, "Join Request Already Exists");
    }

    const result = await prisma.joinRequest.create({
      data: {
        attendeeId: userId,
        tripId,
        tripAdminId: adminId,
      },
      include: {
        trip: true,
        admin: true,
        attendee: true,
      },
    });
    return result;
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

const rejectJoinRequest = async (
  userId: string,
  tripId: string,
  adminId: string
) => {
  try {
    const result = await prisma.joinRequest.findFirst({
      where: {
        attendeeId: userId,
        tripId,
        tripAdminId: adminId,
        status: RequestStatus.PENDING,
      },
    });

    if (result) {
      throw new ApiError(statusCode.BAD_REQUEST, "Join Request Not Found");
    }

    const request = await prisma.joinRequest.update({
      where: {
        tripId_attendeeId_tripAdminId: {
          tripId,
          attendeeId: userId,
          tripAdminId: adminId,
        },
      },
      data: {
        status: RequestStatus.REJECTED,
      },
    });
    return request;
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

const gtAllRequests = async (adminId: string) => {
  try {
    const result = await prisma.joinRequest.findMany({
      where: {
        tripAdminId: adminId,
        status: RequestStatus.PENDING,
      },
      include: {
        attendee: {
          select: {
            id: true,
            name: true,
            username: true,
            profilePhoto: true,
          },
        },
        trip: {
          select: {
            id: true,
            destination: true,
            startDate: true,
            slug: true,
            endDate: true,
          },
        },
      },
    });

    if (!result) {
      throw new ApiError(statusCode.BAD_REQUEST, "Join Request Not Found");
    }

    return result;
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

export const JoinRequestServices = {
  getStatus,
  acceptRequestForJoining,
  rejectJoinRequest,
  requestForJoining,
  gtAllRequests,
};
