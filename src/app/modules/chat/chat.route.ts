import express, { type NextFunction } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { ChatControllers } from "./chat.controller";
const router = express.Router();

router.get("/conversations", auth(UserRole.USER), ChatControllers.getMyConversations);

export const ChatRoutes = router;
