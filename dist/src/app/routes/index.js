"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const payment_route_1 = require("../modules/payment/payment.route");
const subscription_route_1 = require("../modules/subscriptions/subscription.route");
const trip_route_1 = require("../modules/trip/trip.route");
const joinRequest_route_1 = require("../modules/joinRequest/joinRequest.route");
const chat_route_1 = require("../modules/chat/chat.route");
exports.router = express_1.default.Router();
const routes = [
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/user",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.PaymentRoutes,
    },
    {
        path: "/subscription",
        route: subscription_route_1.SubscriptionRoutes,
    },
    {
        path: "/trip",
        route: trip_route_1.TripRoutes,
    },
    {
        path: "/join-request",
        route: joinRequest_route_1.JoinRequestRoutes,
    },
    {
        path: "/chat",
        route: chat_route_1.ChatRoutes,
    },
];
routes.map((route) => exports.router.use(route.path, route.route));
//# sourceMappingURL=index.js.map