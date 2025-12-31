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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueUsername = generateUniqueUsername;
const prisma_1 = require("../../shared/prisma");
function generateUniqueUsername(baseName) {
    return __awaiter(this, void 0, void 0, function* () {
        let username = baseName.toLowerCase().replace(/[^a-z0-9]/g, "");
        let isUnique = false;
        let attempt = 0;
        const originalUsername = username;
        while (!isUnique) {
            const existingUser = yield prisma_1.prisma.user.findFirst({
                where: { username: username },
            });
            if (!existingUser) {
                isUnique = true;
            }
            else {
                attempt++;
                const randomSuffix = Math.floor(1000 + Math.random() * 9000);
                username = `${originalUsername}${randomSuffix}`;
            }
            if (attempt > 10)
                throw new Error("Could not generate unique username");
        }
        return username;
    });
}
//# sourceMappingURL=usernameGenerator.js.map