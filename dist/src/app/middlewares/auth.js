import ApiError from "../error/ApiError";
import statusCode from "http-status";
import jwt, {} from "jsonwebtoken";
import { EnvVars } from "../../config/env";
export const auth = (...authRoles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization || req.cookies.accessToken;
        if (!token) {
            throw new ApiError(statusCode.NOT_FOUND, "Token Not Found");
        }
        const verifiedUser = jwt.verify(token, EnvVars.JWT_ACCESS_TOKEN_SECRET);
        const user = {
            email: verifiedUser.email,
            userId: verifiedUser.id,
            name: verifiedUser.name,
            role: verifiedUser.role,
        };
        console.log("auth info", user);
        if (authRoles.length && !authRoles.includes(user.role)) {
            throw new ApiError(statusCode.UNAUTHORIZED, "You are not authorized to view the content");
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=auth.js.map