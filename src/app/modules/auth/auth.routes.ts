import express from "express";
import { AuthControllers } from "./auth.controller";
const router = express.Router();

router.post("/login", AuthControllers.loginUser);
router.post("/refresh-token", AuthControllers.refreshToken);
router.get("/me", AuthControllers.getMe);

export const AuthRoutes = router;