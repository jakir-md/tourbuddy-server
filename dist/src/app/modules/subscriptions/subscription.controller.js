import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { SubscriptionServices } from "./subscription.service";
const createNewSubscriptionPlan = catchAsync(async (req, res) => {
    const result = await SubscriptionServices.createNewSubscriptionPlan(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Subscription created successfuly!",
        data: result,
    });
});
const getAllPlans = catchAsync(async (req, res) => {
    const result = await SubscriptionServices.getAllPlans();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Subscription fetched successfuly!",
        data: result,
    });
});
const upgradeSubscription = catchAsync(async (req, res) => {
    console.log("payload", req?.user?.userId);
    const result = await SubscriptionServices.upgradeSubscription({
        ...req.body,
        userId: req?.user?.userId,
    });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Subscription Payment initiated successfuly!",
        data: result,
    });
});
export const SubscriptionControllers = {
    createNewSubscriptionPlan,
    upgradeSubscription,
    getAllPlans,
};
//# sourceMappingURL=subscription.controller.js.map