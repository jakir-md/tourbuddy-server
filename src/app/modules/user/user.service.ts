import { prisma } from "../../../../lib/prisma";
import ApiError from "../../error/ApiError";
import statusCode from "http-status";
import bcrypt from "bcryptjs";
import { EnvVars } from "../../../config/env";
import { generateUniqueUsername } from "../../helpers/usernameGenerator";

const registerUser = async (payload: any) => {
  try {
    const hashedPassword = await bcrypt.hash(
      payload.password,
      Number(EnvVars.BCRYPT_SALT_ROUND)
    );

    const existingUser = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (existingUser)
      throw new ApiError(statusCode.BAD_REQUEST, "User already exists");
    const baseForUsername = payload.email.split("@")[0] || payload.name;
    const username = await generateUniqueUsername(baseForUsername);
    payload.password = hashedPassword;
    payload = { ...payload, username };
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
