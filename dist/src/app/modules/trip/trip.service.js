"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = require("../../../shared/prisma");
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const slug_generator_1 = require("../../helpers/slug-generator");
const paginationHelper_1 = require("../../helpers/paginationHelper");
const trip_constants_1 = require("./trip.constants");
const getSearchIndex_1 = require("../../helpers/getSearchIndex");
const client_1 = require("@prisma/client");
const createNewTrip = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, destination, startPoint, itinerary, userId } = payload, otherData = __rest(payload, ["title", "destination", "startPoint", "itinerary", "userId"]);
    const slug = (0, slug_generator_1.generateSlug)(startPoint, destination, itinerary);
    const searchIndex = (0, getSearchIndex_1.getSearchIndex)(title, startPoint, destination, itinerary);
    const creationPayload = Object.assign(Object.assign({}, otherData), { startPoint,
        userId,
        itinerary,
        title,
        destination,
        searchIndex,
        slug, budget: Number(payload.budget) });
    try {
        const newTrip = yield prisma_1.prisma.trip.create({
            data: Object.assign(Object.assign({}, creationPayload), { tripApprovals: { create: { userId } } }),
        });
        return newTrip;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const tripById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.trip.findUnique({
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
                description: true,
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
        if (result === null || result === void 0 ? void 0 : result.bannerImage)
            photos.push(result === null || result === void 0 ? void 0 : result.bannerImage);
        const itineraries = (result === null || result === void 0 ? void 0 : result.itinerary) || [];
        if (Array.isArray(itineraries)) {
            itineraries.forEach((day) => {
                day.activities.forEach((act) => {
                    photos.push(act.image);
                });
            });
        }
        return Object.assign(Object.assign({}, result), { photos });
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const getAllTrip = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: trip_constants_1.tripSearchableFields.map((field) => ({
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
                const dateValue = filterData === null || filterData === void 0 ? void 0 : filterData.startDate;
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
        const result = yield prisma_1.prisma.trip.findMany({
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
                description: true,
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
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const fetchTripsForApproval = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.tripApproval.findMany({
            where: {
                approveStatus: client_1.ApproveStatus.PENDING,
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
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const fetchUserAllTrips = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.tripApproval.findMany({
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
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const updateStatus = (_a) => __awaiter(void 0, [_a], void 0, function* ({ approvalId, moderatorId, status, message = "Accepted Trip", }) {
    const isTripApprovalExists = yield prisma_1.prisma.tripApproval.findUnique({
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
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Trip Approval Not Found");
    }
    try {
        yield prisma_1.prisma.$transaction((tnx) => __awaiter(void 0, void 0, void 0, function* () {
            yield tnx.trip.update({
                where: {
                    id: isTripApprovalExists.trip.id,
                },
                data: {
                    approveStatus: status,
                },
            });
            yield tnx.tripApproval.update({
                where: {
                    id: approvalId,
                },
                data: {
                    approveStatus: status,
                    moderatorId: moderatorId,
                    message,
                },
            });
        }));
        return null;
    }
    catch (error) {
        console.log("error while approving trip");
    }
});
const allStartPoint = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.trip.findMany({
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
});
const reviewableTrips = (_a) => __awaiter(void 0, [_a], void 0, function* ({ tripAdminId, attendeeId, }) {
    try {
        const result = yield prisma_1.prisma.joinRequest.findMany({
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
        return result;
    }
    catch (error) {
        console.log("error while fetching all destionations");
    }
});
const allReviews = (targetId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.review.findMany({
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
                createdAt: true,
            },
        });
        return result;
    }
    catch (error) {
        console.log("error while fetching all destionations");
    }
});
const postReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.review.create({
            data: payload,
        });
        return result;
    }
    catch (error) {
        console.log("error while posting review on profile");
    }
});
const fetchUserTripForProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.trip.findMany({
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
});
const upComingTrip = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.trip.findFirst({
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
        return result;
    }
    catch (error) {
        console.log("Error while fetching trips", error);
    }
});
const userAnalytics = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tripsCreated = yield prisma_1.prisma.trip.count({
            where: {
                userId,
                approveStatus: "APPROVED",
            },
        });
        const tripsJoined = yield prisma_1.prisma.joinRequest.count({
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
});
const getTrendingTrips = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.trip.findMany({
            where: {
                approveStatus: "APPROVED",
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 6,
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
                description: true,
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
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
exports.TripServices = {
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
    getTrendingTrips,
};
//# sourceMappingURL=trip.service.js.map