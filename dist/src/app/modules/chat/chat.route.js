"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const chat_controller_1 = require("./chat.controller");
const router = express_1.default.Router();
router.get("/conversations", (0, auth_1.auth)(client_1.UserRole.USER), chat_controller_1.ChatControllers.getMyConversations);
exports.ChatRoutes = router;
//# sourceMappingURL=chat.route.js.map