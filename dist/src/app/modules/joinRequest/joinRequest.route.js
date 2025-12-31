import express, {} from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { JoinRequestControllers } from "./joinRequest.controller";
const router = express.Router();
router.post("/status", auth(UserRole.USER), JoinRequestControllers.getStatus);
router.post("/accept", auth(UserRole.USER), JoinRequestControllers.acceptRequestForJoining);
router.post("/reject", auth(UserRole.USER), JoinRequestControllers.rejectJoinRequest);
router.post("/request", auth(UserRole.USER), JoinRequestControllers.requestForJoining);
router.get("/joined-trips", auth(UserRole.USER), JoinRequestControllers.joinedTrips);
router.get("/", auth(UserRole.USER), JoinRequestControllers.gtAllRequests);
router.get("/joined-profiles/:slug", auth(UserRole.ADMIN, UserRole.MODERATOR, UserRole.USER), JoinRequestControllers.joinedUserProfiles);
export const JoinRequestRoutes = router;
//# sourceMappingURL=joinRequest.route.js.map