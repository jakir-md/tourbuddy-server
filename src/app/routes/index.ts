import express from "express";
import { AuthRoutes } from "../modules/customer/auth/auth.routes";
import { UserRoutes } from "../modules/customer/user/user.routes";

export const router = express.Router();

const routes = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/user",
        route: UserRoutes
    }
]

routes.map(route => router.use(route.path, route.route))