import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../../../shared/catchAsync";
import { sendResponse } from "../../../../shared/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req: Request, res: Response) => {

    const result = await UserServices.createUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Patient Created successfuly!",
        data: result
    })
});

export const UserControllers = {
    createUser
}