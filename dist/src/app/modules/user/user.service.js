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
exports.UserServices = void 0;
const prisma_1 = require("../../../shared/prisma");
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../../../config/env");
const usernameGenerator_1 = require("../../helpers/usernameGenerator");
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(payload.password, Number(env_1.EnvVars.BCRYPT_SALT_ROUND));
        const existingUser = yield prisma_1.prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (existingUser)
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User already exists");
        const baseForUsername = payload.email.split("@")[0] || payload.name;
        const username = yield (0, usernameGenerator_1.generateUniqueUsername)(baseForUsername);
        payload.password = hashedPassword;
        payload = Object.assign(Object.assign({}, payload), { username });
        const result = yield prisma_1.prisma.user.create({
            data: payload,
        });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const verificationStatus = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExist = yield prisma_1.prisma.profileVerification.findFirst({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
            select: {
                message: true,
                status: true,
            },
        });
        return isExist;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const getAllVerifyRequests = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allRequests = yield prisma_1.prisma.profileVerification.findMany({
            // where: {
            //   status: "PENDING",
            // },
            select: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        email: true,
                        profilePhoto: true,
                    },
                },
                selfieImage: true,
                facebookProfileLink: true,
                fbPageLink: true,
                id: true,
                nidBack: true,
                status: true,
                nidFront: true,
                utilityBill: true,
                moderator: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        email: true,
                        profilePhoto: true,
                    },
                },
            },
        });
        return allRequests;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const verifyWithKYC = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAlreadyRequested = yield prisma_1.prisma.profileVerification.findFirst({
            where: {
                userId: payload.userId,
                status: "PENDING",
            },
        });
        if (isAlreadyRequested) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You have a pending request");
        }
        const result = yield prisma_1.prisma.profileVerification.create({
            data: payload,
        });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const updateVerifyRequests = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ifUpdated = yield prisma_1.prisma.profileVerification.findUnique({
            where: {
                id: payload === null || payload === void 0 ? void 0 : payload.id,
                status: "PENDING",
            },
        });
        if (!ifUpdated) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Status Already Updated.");
        }
        const result = yield prisma_1.prisma.profileVerification.update({
            where: {
                id: payload === null || payload === void 0 ? void 0 : payload.id,
            },
            data: {
                status: payload === null || payload === void 0 ? void 0 : payload.status,
                moderator: {
                    connect: { id: payload === null || payload === void 0 ? void 0 : payload.moderatorId },
                },
                message: payload === null || payload === void 0 ? void 0 : payload.message,
                user: {
                    update: {
                        isVerified: (payload === null || payload === void 0 ? void 0 : payload.status) === "APPROVED",
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
const userInfoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                username: true,
                name: true,
                profilePhoto: true,
                isVerified: true,
                createdAt: true,
            },
        });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
exports.UserServices = {
    registerUser,
    verifyWithKYC,
    verificationStatus,
    getAllVerifyRequests,
    updateVerifyRequests,
    userInfoById,
};
//# sourceMappingURL=user.service.js.map