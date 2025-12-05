import express from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { PaymentControllers } from "./payment.controller";
const router = express.Router();

router.post("/success", PaymentControllers.paymentSuccess);
router.post("/fail", PaymentControllers.paymentFail);

export const PaymentRoutes = router;
