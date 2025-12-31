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
exports.AuthServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtHelper_1 = require("../../helpers/jwtHelper");
const env_1 = require("../../../config/env");
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = require("../../../shared/prisma");
const loginUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password, }) {
    try {
        const userData = yield prisma_1.prisma.user.findUniqueOrThrow({
            where: {
                email: email,
            },
        });
        console.log("user Data", userData);
        const isCorrectPassword = yield bcryptjs_1.default.compare(password, userData === null || userData === void 0 ? void 0 : userData.password);
        if (!isCorrectPassword) {
            throw new Error("Password incorrect!");
        }
        const accessToken = (0, jwtHelper_1.generateToken)({ email, role: userData.role, id: userData.id, name: userData.name }, env_1.EnvVars.JWT_ACCESS_TOKEN_SECRET, env_1.EnvVars.JWT_ACCESS_TOKEN_EXPIRES);
        const refreshToken = (0, jwtHelper_1.generateToken)({ email, role: userData.role, id: userData.id, name: userData.name }, env_1.EnvVars.JWT_REFRESH_TOKEN_SECRET, env_1.EnvVars.JWT_REFRESH_TOKEN_EXPIRES);
        return {
            accessToken,
            refreshToken,
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, error.message);
    }
});
const newRefreshBothTokens = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedToken = null;
    try {
        decodedToken = (0, jwtHelper_1.verifyToken)(token, env_1.EnvVars.JWT_REFRESH_TOKEN_SECRET);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
    }
    const userData = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: decodedToken.email,
        },
    });
    const accessToken = (0, jwtHelper_1.generateToken)({
        email: userData.email,
        role: userData.role,
        id: userData.id,
        name: userData.name,
    }, env_1.EnvVars.JWT_ACCESS_TOKEN_SECRET, env_1.EnvVars.JWT_ACCESS_TOKEN_EXPIRES);
    const refreshToken = (0, jwtHelper_1.generateToken)({
        email: userData.email,
        role: userData.role,
        id: userData.id,
        name: userData.name,
    }, env_1.EnvVars.JWT_REFRESH_TOKEN_SECRET, env_1.EnvVars.JWT_REFRESH_TOKEN_EXPIRES);
    return {
        accessToken,
        refreshToken,
    };
});
const getMe = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = user.accessToken;
    const verifiedUser = (0, jwtHelper_1.verifyToken)(accessToken, env_1.EnvVars.JWT_ACCESS_TOKEN_SECRET);
    const userdata = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
            role: true,
            isVerified: true,
            bio: true,
            age: true,
            gender: true,
            interests: true,
            // subscription: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    console.log("userdata", userdata);
    return userdata;
});
exports.AuthServices = {
    loginUser,
    newRefreshBothTokens,
    getMe,
};
//# sourceMappingURL=auth.service.js.map