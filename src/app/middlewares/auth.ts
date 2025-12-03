import type { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError";
import statusCode from "http-status";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { EnvVars } from "../../config/env";
import type { IVerifiedUser } from "../interfaces/verfiedUser";

export const auth = (...authRoles: string[]) => async (req: Request & { user?: IVerifiedUser }, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization || req.cookies.accessToken;
        if (!token) {
            throw new ApiError(statusCode.NOT_FOUND, "Token Not Found");
        }

        const verifiedUser = jwt.verify(token as string, EnvVars.JWT_ACCESS_TOKEN_SECRET as string) as JwtPayload;

        const user: IVerifiedUser = {
            email: verifiedUser.email,
            userId: verifiedUser.id,
            name: verifiedUser.name,
            role: verifiedUser.role
        }

        if (authRoles.length && !authRoles.includes(user.role)) {
            throw new ApiError(statusCode.UNAUTHORIZED, "You are not authorized to view the content");
        }
    } catch (error) {
        next(error);
    }
}