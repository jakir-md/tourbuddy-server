import statusCode from "http-status";
import { prisma } from "../../../../lib/prisma";
import ApiError from "../../error/ApiError";
import { generateSlug } from "../../helpers/slug-generator";
import { paginationHelper } from "../../helpers/paginationHelper";
import type { IPaginationOptions } from "../../interfaces/pagination";
import type { ITripFilterRequest } from "./trip.interface";
import { tripSearchableFields } from "./trip.constants";
import { getSearchIndex } from "../../helpers/getSearchIndex";
import {
  ApproveStatus,
  type Prisma,
} from "../../../../generated/prisma/client";

const createNewTrip = async (payload: any) => {
  const { title, destination, startPoint, itinerary, userId, ...otherData } =
    payload;
  const slug = generateSlug(startPoint, destination, itinerary);
  const searchIndex = getSearchIndex(title, startPoint, destination, itinerary);
  const creationPayload = {
    ...otherData,
    startPoint,
    userId,
    itinerary,
    title,
    destination,
    searchIndex,
    slug,
    budget: Number(payload.budget),
  };
  try {
    const newTrip = await prisma.trip.create({
      data: { ...creationPayload, tripApprovals: { create: { userId } } },
    });
    return null;
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

const tripById = async (id: string) => {
  try {
    const result = await prisma.trip.findUnique({
      where: {
        slug: id,
      },
      select: {
        id: true,
        title: true,
        budget: true,
        bannerImage: true,
        startDate: true,
        endDate: true,
        activities: true,
        itinerary: true,
        category: true,
        destination: true,
        user: {
          select: {
            id: true,
            name: true,
            profilePhoto: true,
            isVerified: true,
          },
        }
      },
    });

    const photos: string[] = [];
    if (result?.bannerImage) photos.push(result?.bannerImage);
    result?.itinerary?.forEach((day: any) => {
      day.activities.forEach((act: any) => {
        photos.push(act.image);
      });
    });
    return { ...result, photos };
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

const getAllTrip = async (
  filters: ITripFilterRequest,
  options: IPaginationOptions
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: Prisma.TripWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: tripSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map((key) => {
      if (key === "startDate") {
        const dateValue = filterData?.startDate as string;
        return {
          startDate: {
            gte: dateValue,
          },
        };
      }

      return {
        [key]: {
          equals: (filterData as any)[key],
        },
      };
    });

    andConditions.push(...filterConditions);
  }

  const whereConditions: Prisma.TripWhereInput =
    andConditions.length > 0
      ? { AND: andConditions, approveStatus: "APPROVED" }
      : {};

  try {
    const result = await prisma.trip.findMany({
      where: whereConditions,
      select: {
        id: true,
        title: true,
        budget: true,
        bannerImage: true,
        startDate: true,
        endDate: true,
        activities: true,
        category: true,
        destination: true,
        slug: true,
        user: {
          select: {
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

const fetchTripsForApproval = async () => {
  try {
    const result = await prisma.tripApproval.findMany({
      where: {
        approveStatus: ApproveStatus.PENDING,
      },
      select: {
        user: {
          select: {
            username: true,
            name: true,
            profilePhoto: true,
            id: true,
            email: true,
          },
        },
        trip: {
          select: {
            slug: true,
            title: true,
            bannerImage: true,
          },
        },
        approveStatus: true,
        id: true,
      },
    });
    return result;
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

const fetchUserAllTrips = async (userId: string) => {
  console.log("user trips", userId);
  try {
    const result = await prisma.tripApproval.findMany({
      where: {
        userId,
      },
      select: {
        trip: {
          select: {
            slug: true,
            title: true,
            bannerImage: true,
          },
        },
        approveStatus: true,
        id: true,
        message: true,
      },
    });
    return result;
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

const updateStatus = async ({
  approvalId,
  moderatorId,
  status,
  message = "Accepted Trip",
}: {
  approvalId: string;
  moderatorId: string;
  status: ApproveStatus;
  message: string;
}) => {
  const isTripApprovalExists = await prisma.tripApproval.findUnique({
    where: {
      id: approvalId,
    },
    select: {
      trip: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!isTripApprovalExists) {
    throw new ApiError(statusCode.BAD_REQUEST, "Trip Approval Not Found");
  }

  try {
    await prisma.$transaction(async (tnx) => {
      await tnx.trip.update({
        where: {
          id: isTripApprovalExists.trip.id,
        },
        data: {
          approveStatus: status,
        },
      });

      await tnx.tripApproval.update({
        where: {
          id: approvalId,
        },
        data: {
          approveStatus: status,
          moderatorId: moderatorId,
          message,
        },
      });
    });

    return null;
  } catch (error) {
    console.log("error while approving trip");
  }
};

const allStartPoint = async () => {
  try {
    const result = await prisma.trip.findMany({
      select: {
        startPoint: true,
      },
    });

    const arr: any = [];
    const temp: string[] = [];
    result.forEach((item) => {
      if (!temp.includes(item.startPoint)) {
        arr.push({
          label: item.startPoint,
          value: item.startPoint,
        });
        temp.push(item.startPoint);
      }
    });
    return arr;
  } catch (error) {
    console.log("error while fetching all destionations");
  }
};

const reviewableTrips = async ({
  tripAdminId,
  attendeeId,
}: {
  tripAdminId: string;
  attendeeId: string;
}) => {
  try {
    const result = await prisma.joinRequest.findMany({
      where: {
        tripAdminId,
        attendeeId,
        status: "ACCEPTED",
      },
      select: {
        trip: {
          select: {
            id: true,
            title: true,
            startDate: true,
          },
        },
      },
    });
    console.log("result", result);
    return result;
  } catch (error) {
    console.log("error while fetching all destionations");
  }
};

const allReviews = async (targetId: string) => {
  try {
    const result = await prisma.review.findMany({
      where: {
        targetId,
      },
      select: {
        trip: {
          select: {
            title: true,
          },
        },
        author: {
          select: {
            profilePhoto: true,
            name: true,
          },
        },
        rating: true,
        comment: true,
      },
    });
    return result;
  } catch (error) {
    console.log("error while fetching all destionations");
  }
};

const postReview = async (payload: any) => {
  console.log("payload from post reivew", payload);
  try {
    const result = await prisma.review.create({
      data: payload,
    });
    return result;
  } catch (error) {
    console.log("error while posting review on profile");
  }
};

const fetchUserTripForProfile = async (userId: string) => {
  try {
    const result = await prisma.trip.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        title: true,
        budget: true,
        bannerImage: true,
        startDate: true,
        endDate: true,
        activities: true,
        category: true,
        destination: true,
        slug: true,
        user: {
          select: {
            name: true,
            profilePhoto: true,
            isVerified: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log("Error while fetching trips", error);
  }
};

export const TripServices = {
  createNewTrip,
  getAllTrip,
  tripById,
  fetchTripsForApproval,
  updateStatus,
  fetchUserAllTrips,
  allStartPoint,
  reviewableTrips,
  allReviews,
  fetchUserTripForProfile,
  postReview,
};
