import statusCode from "http-status";
import { prisma } from "../../../../lib/prisma";
import ApiError from "../../error/ApiError";

const createNewTrip = async (payload: any, images: string[]) => {
  console.log("payload", payload);
  const creationPayload = {
    ...payload,
    startDate: new Date(payload.startDate),
    endDate: new Date(payload.endDate),
    budget: Number(payload.budget),
    photos: images,
  };
  try {
    const result = await prisma.trip.create({
      data: creationPayload,
    });
    console.log("result", result);
    return result;
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

const tripById = async (id: string) => {
  try {
    const result = await prisma.trip.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        budget: true,
        photos: true,
        startDate: true,
        endDate: true,
        activities: true,
        itinerary: true,
        type: true,
        destination: true,
        user: {
          select: {
            id: true,
            name: true,
            profilePhoto: true,
            isVerified: true,
          },
        },
      },
    });
    return result;
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

const getAllTrip = async () => {
  try {
    const result = await prisma.trip.findMany({
      select: {
        id: true,
        budget: true,
        photos: true,
        startDate: true,
        endDate: true,
        activities: true,
        type: true,
        destination: true,
        //approveStatus
        user: {
          select: {
            name: true,
            profilePhoto: true,
            isVerified: true,
          },
        },
      },
    });
    // console.log("all tours", result);
    return result;
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

export const TripServices = {
  createNewTrip,
  getAllTrip,
  tripById,
};
