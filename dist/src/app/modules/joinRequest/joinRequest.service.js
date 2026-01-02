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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinRequestServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../shared/prisma");
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const getStatus = (userId, tripId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.joinRequest.findFirst({
            where: {
                attendeeId: userId,
                tripId,
            },
        });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
//another business logic: checking his current subscription plans information
//for eligibility
const acceptRequestForJoining = (userId, tripId, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.joinRequest.findFirst({
            where: {
                tripAdminId: adminId,
                tripId,
                attendeeId: userId,
                status: client_1.RequestStatus.PENDING,
            },
            include: {
                trip: {
                    select: {
                        title: true,
                        slug: true,
                    },
                },
            },
        });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Join Request Not Found");
        }
        const join = yield prisma_1.prisma.$transaction((tnx) => __awaiter(void 0, void 0, void 0, function* () {
            yield tnx.joinRequest.update({
                where: {
                    tripId_attendeeId_tripAdminId: {
                        tripId,
                        attendeeId: userId,
                        tripAdminId: adminId,
                    },
                },
                data: {
                    status: client_1.RequestStatus.ACCEPTED,
                },
            });
            const conversationExists = yield tnx.conversation.findFirst({
                where: {
                    adminId,
                    tripId,
                },
            });
            if (!conversationExists) {
                const conversationCreate = yield tnx.conversation.create({
                    data: {
                        adminId,
                        tripId,
                        title: result.trip.title,
                    },
                });
                const memberData = [
                    { userId: adminId, conversationId: conversationCreate.id },
                    { userId: userId, conversationId: conversationCreate.id },
                ];
                const memberAdd = yield tnx.conversationMember.createMany({
                    data: memberData,
                });
            }
            else {
                const memberAdd = yield tnx.conversationMember.create({
                    data: {
                        userId: userId,
                        conversationId: conversationExists.id,
                    },
                });
            }
        }));
        return {
            success: true,
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const requestForJoining = (userId, tripId, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield prisma_1.prisma.joinRequest.findFirst({
            where: {
                attendeeId: userId,
                tripId,
                tripAdminId: adminId,
            },
        });
        if (request) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Join Request Already Exists");
        }
        const result = yield prisma_1.prisma.joinRequest.create({
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
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const rejectJoinRequest = (userId, tripId, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.joinRequest.findFirst({
            where: {
                attendeeId: userId,
                tripId,
                tripAdminId: adminId,
                status: client_1.RequestStatus.PENDING,
            },
        });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Join Request Not Found");
        }
        const request = yield prisma_1.prisma.joinRequest.update({
            where: {
                tripId_attendeeId_tripAdminId: {
                    tripId,
                    attendeeId: userId,
                    tripAdminId: adminId,
                },
            },
            data: {
                status: client_1.RequestStatus.REJECTED,
            },
        });
        return request;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const gtAllRequests = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.joinRequest.findMany({
            where: {
                tripAdminId: adminId,
                // status: RequestStatus.PENDING,
            },
            select: {
                id: true,
                status: true,
                attendee: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        email: true,
                        profilePhoto: true,
                    },
                },
                trip: {
                    select: {
                        id: true,
                        title: true,
                        destination: true,
                        slug: true,
                        bannerImage: true,
                    },
                },
            },
        });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Join Request Not Found");
        }
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const joinedUserProfiles = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.trip.findUnique({
            where: {
                slug,
            },
        });
        if (!result) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Trip Not Found");
        }
        const joinedUsers = yield prisma_1.prisma.joinRequest.findMany({
            where: {
                tripId: result.id,
                status: "ACCEPTED",
            },
            select: {
                attendee: {
                    select: {
                        id: true,
                        profilePhoto: true,
                        isVerified: true,
                        name: true,
                    },
                },
            },
        });
        return joinedUsers;
    }
    catch (error) {
        console.log("Error while fetching trips", error);
    }
});
const joinedTrips = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.joinRequest.findMany({
            where: {
                attendeeId: userId,
                status: "ACCEPTED",
            },
            select: {
                trip: {
                    select: {
                        id: true,
                        startDate: true,
                        approveStatus: true,
                        bannerImage: true,
                        title: true,
                        slug: true,
                        endDate: true,
                    },
                },
            },
        });
        return result;
    }
    catch (error) {
        console.log("Error while fetching joined trips", error);
    }
});
exports.JoinRequestServices = {
    getStatus,
    acceptRequestForJoining,
    rejectJoinRequest,
    requestForJoining,
    gtAllRequests,
    joinedUserProfiles,
    joinedTrips,
};
//# sourceMappingURL=joinRequest.service.js.map