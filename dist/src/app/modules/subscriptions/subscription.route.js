"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const subscription_controller_1 = require("./subscription.controller");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/create", (0, auth_1.auth)(client_1.UserRole.ADMIN), subscription_controller_1.SubscriptionControllers.createNewSubscriptionPlan);
router.get("/all-plans", (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.USER), subscription_controller_1.SubscriptionControllers.getAllPlans);
router.post("/upgrade-subscription", (0, auth_1.auth)(client_1.UserRole.USER), subscription_controller_1.SubscriptionControllers.upgradeSubscription);
exports.SubscriptionRoutes = router;
//# sourceMappingURL=subscription.route.js.map