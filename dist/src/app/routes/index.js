import express from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { SubscriptionRoutes } from "../modules/subscriptions/subscription.route";
import { TripRoutes } from "../modules/trip/trip.route";
import { JoinRequestRoutes } from "../modules/joinRequest/joinRequest.route";
import { ChatRoutes } from "../modules/chat/chat.route";
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
    {
        path: "/trip",
        route: TripRoutes,
    },
    {
        path: "/join-request",
        route: JoinRequestRoutes,
    },
    {
        path: "/chat",
        route: ChatRoutes,
    },
];
routes.map((route) => router.use(route.path, route.route));
//# sourceMappingURL=index.js.map