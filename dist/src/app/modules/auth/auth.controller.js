import { AuthServices } from "./auth.service";
import statusCode from "http-status";
import { tokenMaxAge } from "../../../shared/tokenMaxage";
import { EnvVars } from "../../../config/env";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
const loginUser = catchAsync(async (req, res, next) => {
    const result = await AuthServices.loginUser(req.body);
    const accessTokenValue = EnvVars.JWT_ACCESS_TOKEN_EXPIRES?.slice(0, -1);
    const accessTokenUnit = EnvVars.JWT_ACCESS_TOKEN_EXPIRES?.slice(-1);
    const refreshTokenValue = EnvVars.JWT_REFRESH_TOKEN_EXPIRES?.slice(0, -1);
    const refreshTokenUnit = EnvVars.JWT_REFRESH_TOKEN_EXPIRES?.slice(-1);
    const accessTokenMaxAge = tokenMaxAge(parseInt(accessTokenValue), accessTokenUnit);
    const refreshTokenMaxAge = tokenMaxAge(parseInt(refreshTokenValue), refreshTokenUnit);
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
    sendResponse(res, {
        data: null,
        message: "Successfully Logged In",
        statusCode: statusCode.OK,
        success: true,
    });
});
const refreshToken = catchAsync(async (req, res, next) => {
    const result = await AuthServices.newRefreshBothTokens(req.cookies.refreshToken);
    const accessTokenValue = EnvVars.JWT_ACCESS_TOKEN_EXPIRES?.slice(0, -1);
    const accessTokenUnit = EnvVars.JWT_ACCESS_TOKEN_EXPIRES?.slice(-1);
    const refreshTokenValue = EnvVars.JWT_REFRESH_TOKEN_EXPIRES?.slice(0, -1);
    const refreshTokenUnit = EnvVars.JWT_REFRESH_TOKEN_EXPIRES?.slice(-1);
    const accessTokenMaxAge = tokenMaxAge(parseInt(accessTokenValue), accessTokenUnit);
    const refreshTokenMaxAge = tokenMaxAge(parseInt(refreshTokenValue), refreshTokenUnit);
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
    sendResponse(res, {
        data: null,
        message: "Access token generated successfully.",
        statusCode: statusCode.OK,
        success: true,
    });
});
const getMe = catchAsync(async (req, res) => {
    const user = req.cookies;
    console.log("user from get me", user);
    const result = await AuthServices.getMe(user);
    sendResponse(res, {
        statusCode: statusCode.OK,
        success: true,
        message: "User retrieved successfully",
        data: result,
    });
});
export const AuthControllers = {
    loginUser,
    refreshToken,
    getMe,
};
//# sourceMappingURL=auth.controller.js.map