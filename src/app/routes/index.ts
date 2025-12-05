import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/customer/user/user.routes";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { SubscriptionRoutes } from "../modules/subscriptions/subscription.route";

export const router = express.Router();

const routes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/subscription",
    route: SubscriptionRoutes,
  },
];

routes.map((route) => router.use(route.path, route.route));
