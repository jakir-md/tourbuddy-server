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

const verificationStatus = async (userId: string) => {
  try {
    const isExist = await prisma.profileVerification.findFirst({
      where: {
        userId,
        status: "PENDING",
      },
    });
    return isExist;
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

const getAllVerifyRequests = async () => {
  try {
    const allRequests = await prisma.profileVerification.findMany({
      where: {
        status: "PENDING",
      },
      select: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true,

          }
        }
      }
    });
    return allRequests;
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

const verifyWithKYC = async (payload: any) => {
  console.log("payload", payload);
  try {
    const isAlreadyRequested = await prisma.profileVerification.findFirst({
      where: {
        userId: payload.userId,
        status: "PENDING",
      },
    });

    if (isAlreadyRequested) {
      throw new ApiError(statusCode.BAD_REQUEST, "You have a pending request");
    }
    const result = await prisma.profileVerification.create({
      data: payload,
    });
    return result;
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

const updateVerifyRequests = async (payload: any) => {
  try {
    const result = await prisma.profileVerification.update({
      where: {
        id: payload.id,
      },
      data: {
        status: payload.status,
        moderatorId: payload.moderatorId,
      },
    });
    return result;
  } catch (error: any) {
    throw new ApiError(statusCode.BAD_REQUEST, error.message);
  }
};

export const UserServices = {
  registerUser,
  verifyWithKYC,
  verificationStatus,
  getAllVerifyRequests,
  updateVerifyRequests,
};
