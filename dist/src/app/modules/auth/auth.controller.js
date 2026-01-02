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
exports.AuthControllers = void 0;
const auth_service_1 = require("./auth.service");
const http_status_1 = __importDefault(require("http-status"));
const tokenMaxage_1 = require("../../../shared/tokenMaxage");
const env_1 = require("../../../config/env");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const loginUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const result = yield auth_service_1.AuthServices.loginUser(req.body);
    const accessTokenValue = (_a = env_1.EnvVars.JWT_ACCESS_TOKEN_EXPIRES) === null || _a === void 0 ? void 0 : _a.slice(0, -1);
    const accessTokenUnit = (_b = env_1.EnvVars.JWT_ACCESS_TOKEN_EXPIRES) === null || _b === void 0 ? void 0 : _b.slice(-1);
    const refreshTokenValue = (_c = env_1.EnvVars.JWT_REFRESH_TOKEN_EXPIRES) === null || _c === void 0 ? void 0 : _c.slice(0, -1);
    const refreshTokenUnit = (_d = env_1.EnvVars.JWT_REFRESH_TOKEN_EXPIRES) === null || _d === void 0 ? void 0 : _d.slice(-1);
    const accessTokenMaxAge = (0, tokenMaxage_1.tokenMaxAge)(parseInt(accessTokenValue), accessTokenUnit);
    const refreshTokenMaxAge = (0, tokenMaxage_1.tokenMaxAge)(parseInt(refreshTokenValue), refreshTokenUnit);
    res.cookie("accessToken", result.accessToken, {
        maxAge: accessTokenMaxAge,
        secure: true,
        sameSite: "none",
        httpOnly: true,
    });
    res.cookie("refreshToken", result.refreshToken, {
        maxAge: refreshTokenMaxAge,
        secure: true,
        sameSite: "none",
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        data: null,
        message: "Successfully Logged In",
        statusCode: http_status_1.default.OK,
        success: true,
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const result = yield auth_service_1.AuthServices.newRefreshBothTokens(req.cookies.refreshToken);
    const accessTokenValue = (_a = env_1.EnvVars.JWT_ACCESS_TOKEN_EXPIRES) === null || _a === void 0 ? void 0 : _a.slice(0, -1);
    const accessTokenUnit = (_b = env_1.EnvVars.JWT_ACCESS_TOKEN_EXPIRES) === null || _b === void 0 ? void 0 : _b.slice(-1);
    const refreshTokenValue = (_c = env_1.EnvVars.JWT_REFRESH_TOKEN_EXPIRES) === null || _c === void 0 ? void 0 : _c.slice(0, -1);
    const refreshTokenUnit = (_d = env_1.EnvVars.JWT_REFRESH_TOKEN_EXPIRES) === null || _d === void 0 ? void 0 : _d.slice(-1);
    const accessTokenMaxAge = (0, tokenMaxage_1.tokenMaxAge)(parseInt(accessTokenValue), accessTokenUnit);
    const refreshTokenMaxAge = (0, tokenMaxage_1.tokenMaxAge)(parseInt(refreshTokenValue), refreshTokenUnit);
    res.cookie("accessToken", result.accessToken, {
        maxAge: accessTokenMaxAge,
        secure: true,
        sameSite: "none",
        httpOnly: true,
    });
    res.cookie("refreshToken", result.refreshToken, {
        maxAge: refreshTokenMaxAge,
        secure: true,
        sameSite: "none",
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        data: null,
        message: "Access token generated successfully.",
        statusCode: http_status_1.default.OK,
        success: true,
    });
}));
const getMe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.cookies;
    const result = yield auth_service_1.AuthServices.getMe(user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User retrieved successfully",
        data: result,
    });
}));
exports.AuthControllers = {
    loginUser,
    refreshToken,
    getMe,
};
//# sourceMappingURL=auth.controller.js.map