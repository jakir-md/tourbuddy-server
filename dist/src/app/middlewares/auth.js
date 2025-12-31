"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const ApiError_1 = __importDefault(require("../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const auth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization || req.cookies.accessToken;
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Token Not Found");
        }
        const verifiedUser = jsonwebtoken_1.default.verify(token, env_1.EnvVars.JWT_ACCESS_TOKEN_SECRET);
        const user = {
            email: verifiedUser.email,
            userId: verifiedUser.id,
            name: verifiedUser.name,
            role: verifiedUser.role,
        };
        console.log("auth info", user);
        if (authRoles.length && !authRoles.includes(user.role)) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized to view the content");
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.auth = auth;
//# sourceMappingURL=auth.js.map