import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ChatServices } from "./chat.service";
const getMyConversations = catchAsync(async (req, res) => {
    const userId = req.user?.userId;
    const result = await ChatServices.getMyConversations(userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Conversations fetched successfuly!",
        data: result,
    });
});
export const ChatControllers = {
    getMyConversations,
};
//# sourceMappingURL=chat.controller.js.map