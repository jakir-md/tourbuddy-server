import httpStatus from "http-status";
import { UserServices } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
const registerUser = catchAsync(async (req, res) => {
    const reqBody = JSON.parse(req.body.data);
    const payload = { ...reqBody, profilePhoto: req?.file?.path };
    console.log("payload", payload);
    const result = await UserServices.registerUser(payload);
    console.log("register result", result);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Created successfuly!",
        data: null,
    });
});
const userInfoById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await UserServices.userInfoById(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User info retrieved successfuly!",
        data: result,
    });
});
const verifyWithKYC = catchAsync(async (req, res) => {
    const userId = req.user?.userId;
    const result = await UserServices.verifyWithKYC({ ...req.body, userId });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Verification Requested successfuly!",
        data: result,
    });
});
const verificationStatus = catchAsync(async (req, res) => {
    const userId = req.user?.userId;
    console.log("verification status", userId);
    const result = await UserServices.verificationStatus(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Verification status retrieved successfuly!",
        data: result,
    });
});
const getAllVerifyRequests = catchAsync(async (req, res) => {
    const result = await UserServices.getAllVerifyRequests();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Verification requests retrieved successfuly!",
        data: result,
    });
});
const updateVerifyRequest = catchAsync(async (req, res) => {
    const moderatorId = req.user?.userId;
    const body = { ...req.body, moderatorId };
    const result = await UserServices.updateVerifyRequests(body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Verification requests retrieved successfuly!",
        data: result,
    });
});
export const UserControllers = {
    registerUser,
    userInfoById,
    verifyWithKYC,
    verificationStatus,
    getAllVerifyRequests,
    updateVerifyRequest,
};
//# sourceMappingURL=user.controller.js.map