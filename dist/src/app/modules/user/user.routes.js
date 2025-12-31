"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const multer_config_1 = require("../../../config/multer.config");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/verification-status", (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.MODERATOR), user_controller_1.UserControllers.verificationStatus);
router.get("/verify-requests", (0, auth_1.auth)(client_1.UserRole.MODERATOR, client_1.UserRole.ADMIN), user_controller_1.UserControllers.getAllVerifyRequests);
router.post("/register", multer_config_1.multerUpload.single("file"), user_controller_1.UserControllers.registerUser);
router.post("/verify", (0, auth_1.auth)(client_1.UserRole.USER), user_controller_1.UserControllers.verifyWithKYC);
router.patch("/verify-request", (0, auth_1.auth)(client_1.UserRole.MODERATOR, client_1.UserRole.ADMIN), user_controller_1.UserControllers.updateVerifyRequest);
router.get("/:id", user_controller_1.UserControllers.userInfoById);
exports.UserRoutes = router;
//# sourceMappingURL=user.routes.js.map