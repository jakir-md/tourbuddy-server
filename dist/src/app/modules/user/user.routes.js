import express from "express";
import { UserControllers } from "./user.controller";
import { multerUpload } from "../../../config/multer.config";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";
const router = express.Router();
router.get("/verification-status", auth(UserRole.USER, UserRole.MODERATOR), UserControllers.verificationStatus);
router.get("/verify-requests", auth(UserRole.MODERATOR, UserRole.ADMIN), UserControllers.getAllVerifyRequests);
router.post("/register", multerUpload.single("file"), UserControllers.registerUser);
router.post("/verify", auth(UserRole.USER), UserControllers.verifyWithKYC);
router.patch("/verify-request", auth(UserRole.MODERATOR, UserRole.ADMIN), UserControllers.updateVerifyRequest);
router.get("/:id", UserControllers.userInfoById);
export const UserRoutes = router;
//# sourceMappingURL=user.routes.js.map