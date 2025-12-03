import { prisma } from "../../../../../lib/prisma";
import ApiError from "../../../error/ApiError";
import statusCode from "http-status";

const registerUser = async (payload: any) => {
  try {
    const result = await prisma.user.create({
      data: payload,
    });
    return result;
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

export const UserServices = {
  registerUser,
};
