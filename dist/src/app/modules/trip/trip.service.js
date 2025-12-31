import statusCode from "http-status";
import { prisma } from "../../../../lib/prisma";
import ApiError from "../../error/ApiError";
import { generateSlug } from "../../helpers/slug-generator";
import { paginationHelper } from "../../helpers/paginationHelper";
import { tripSearchableFields } from "./trip.constants";
import { getSearchIndex } from "../../helpers/getSearchIndex";
import { ApproveStatus, } from "../../../../generated/prisma/client";
const createNewTrip = async (payload) => {
    const { title, destination, startPoint, itinerary, userId, ...otherData } = payload;
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
    }
    catch (error) {
        throw new ApiError(statusCode.BAD_REQUEST, error.message);
    }
};
const tripById = async (id) => {
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
                },
            },
        });
        const photos = [];
        if (result?.bannerImage)
            photos.push(result?.bannerImage);
        const itineraries = result?.itinerary || [];
        if (Array.isArray(itineraries)) {
            itineraries.forEach((day) => {
                day.activities.forEach((act) => {
                    photos.push(act.image);
                });
            });
        }
        return { ...result, photos };
    }
    catch (error) {
        throw new ApiError(statusCode.BAD_REQUEST, error.message);
    }
};
const getAllTrip = async (filters, options) => {
    const { limit, page, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
    const andConditions = [];
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
                const dateValue = filterData?.startDate;
                return {
                    startDate: {
                        gte: dateValue,
                    },
                };
            }
            return {
                [key]: {
                    equals: filterData[key],
                },
            };
        });
        andConditions.push(...filterConditions);
    }
    const whereConditions = andConditions.length > 0
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
    }
    catch (error) {
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
    }
    catch (error) {
        throw new ApiError(statusCode.BAD_REQUEST, error.message);
    }
};
const fetchUserAllTrips = async (userId) => {
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
    }
    catch (error) {
        throw new ApiError(statusCode.BAD_REQUEST, error.message);
    }
};
const updateStatus = async ({ approvalId, moderatorId, status, message = "Accepted Trip", }) => {
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
    }
    catch (error) {
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
        const arr = [];
        const temp = [];
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
    }
    catch (error) {
        console.log("error while fetching all destionations");
    }
};
const reviewableTrips = async ({ tripAdminId, attendeeId, }) => {
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
    }
    catch (error) {
        console.log("error while fetching all destionations");
    }
};
const allReviews = async (targetId) => {
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
    }
    catch (error) {
        console.log("error while fetching all destionations");
    }
};
const postReview = async (payload) => {
    console.log("payload from post reivew", payload);
    try {
        const result = await prisma.review.create({
            data: payload,
        });
        return result;
    }
    catch (error) {
        console.log("error while posting review on profile");
    }
};
const fetchUserTripForProfile = async (userId) => {
    try {
        const result = await prisma.trip.findMany({
            where: {
                userId,
                approveStatus: "APPROVED",
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
    }
    catch (error) {
        console.log("Error while fetching trips", error);
    }
};
const upComingTrip = async (userId) => {
    try {
        const result = await prisma.trip.findFirst({
            where: {
                userId,
                approveStatus: "APPROVED",
            },
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                startDate: true,
                approveStatus: true,
                bannerImage: true,
                title: true,
                slug: true,
                endDate: true,
            },
        });
        console.log({ result });
        return result;
    }
    catch (error) {
        console.log("Error while fetching trips", error);
    }
};
const userAnalytics = async (userId) => {
    try {
        const tripsCreated = await prisma.trip.count({
            where: {
                userId,
                approveStatus: "APPROVED",
            },
        });
        const tripsJoined = await prisma.joinRequest.count({
            where: {
                attendeeId: userId,
                status: "ACCEPTED",
            },
        });
        return { tripsCreated, tripsJoined };
    }
    catch (error) {
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
    upComingTrip,
    userAnalytics,
};
//# sourceMappingURL=trip.service.js.map