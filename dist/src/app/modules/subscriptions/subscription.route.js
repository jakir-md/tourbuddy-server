import express from "express";
import { SubscriptionControllers } from "./subscription.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();
router.post("/create", auth(UserRole.ADMIN), SubscriptionControllers.createNewSubscriptionPlan);
router.get("/all-plans", auth(UserRole.ADMIN, UserRole.USER), SubscriptionControllers.getAllPlans);
router.post("/upgrade-subscription", auth(UserRole.USER), SubscriptionControllers.upgradeSubscription);
export const SubscriptionRoutes = router;
//# sourceMappingURL=subscription.route.js.map