import express, { type NextFunction } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { JoinRequestControllers } from "./joinRequest.controller";
const router = express.Router();

router.post("/status", auth(UserRole.USER), JoinRequestControllers.getStatus);

router.post("/", JoinRequestControllers.acceptRequestForJoining);

router.patch("/status", JoinRequestControllers.updateJoinRequest);

export const JoinRequestRoutes = router;
