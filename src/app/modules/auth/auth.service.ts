
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../../helpers/jwtHelper";
import { EnvVars } from "../../../config/env";
import ApiError from "../../error/ApiError";
import statusCode from "http-status";
import type { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../shared/prisma";

const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const userData = await prisma.user.findUniqueOrThrow({
      where: {
        email: email,
      },
    });

    const isCorrectPassword = await bcrypt.compare(
      password,
      userData?.password
    );

    if (!isCorrectPassword) {
      throw new Error("Password incorrect!");
    }

    const accessToken = generateToken(
      { email, role: userData.role, id: userData.id, name: userData.name },
      EnvVars.JWT_ACCESS_TOKEN_SECRET as string,
      EnvVars.JWT_ACCESS_TOKEN_EXPIRES as string
    );
    const refreshToken = generateToken(
      { email, role: userData.role, id: userData.id, name: userData.name },
      EnvVars.JWT_REFRESH_TOKEN_SECRET as string,
      EnvVars.JWT_REFRESH_TOKEN_EXPIRES as string
    );

    return {
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    throw new ApiError(statusCode.NOT_FOUND, error.message);
  }
};

const newRefreshBothTokens = async (token: string) => {
  let decodedToken: JwtPayload | null = null;
  try {
    decodedToken = verifyToken(
      token,
      EnvVars.JWT_REFRESH_TOKEN_SECRET as string
    );
  } catch (error) {
    throw new ApiError(statusCode.UNAUTHORIZED, "You are not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedToken.email,
    },
  });

  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
      id: userData.id,
      name: userData.name,
    },
    EnvVars.JWT_ACCESS_TOKEN_SECRET as string,
    EnvVars.JWT_ACCESS_TOKEN_EXPIRES as string
  );

  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
      id: userData.id,
      name: userData.name,
    },
    EnvVars.JWT_REFRESH_TOKEN_SECRET as string,
    EnvVars.JWT_REFRESH_TOKEN_EXPIRES as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const getMe = async (user: any) => {
  const accessToken = user.accessToken;
  const verifiedUser = verifyToken(
    accessToken,
    EnvVars.JWT_ACCESS_TOKEN_SECRET as string
  );

  const userdata = await prisma.user.findUniqueOrThrow({
    where: {
      email: verifiedUser?.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      profilePhoto: true,
      role: true,
      isVerified: true,
      bio: true,
      age: true,
      gender: true,
      interests: true,
      // subscription: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return userdata;
};
export const AuthServices = {
  loginUser,
  newRefreshBothTokens,
  getMe,
};
