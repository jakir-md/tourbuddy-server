import { prisma } from "../../../../../lib/prisma";
import ApiError from "../../../error/ApiError";
import statusCode from "http-status";
import bcrypt from "bcryptjs";
import { EnvVars } from "../../../../config/env";

const registerUser = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(EnvVars.BCRYPT_SALT_ROUND)
  );

  payload.password = hashedPassword;
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
