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
exports.seedAdmin = void 0;
const prisma_1 = require("../../shared/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../../config/env");
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAdminExists = yield prisma_1.prisma.user.findFirst({
            where: {
                role: "ADMIN",
            },
        });
        if (isAdminExists) {
            console.log("Super admin already exists!");
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash("123456", Number(env_1.EnvVars.BCRYPT_SALT_ROUND));
        const adminCreated = yield prisma_1.prisma.user.create({
            data: {
                email: "admin@gmail.com",
                password: hashedPassword,
                role: "ADMIN",
                name: "Admin Hossain",
                username: "admin84",
            },
        });
        console.log("admin created successfully", adminCreated);
    }
    catch (error) {
        console.log("error while seeding admin", error);
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.seedAdmin = seedAdmin;
//# sourceMappingURL=seed.js.map