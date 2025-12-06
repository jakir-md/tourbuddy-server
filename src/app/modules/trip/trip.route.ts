import express, { type NextFunction } from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { TripControllers } from "./trip.controller";
import { multerUpload } from "../../../config/multer.config";
const router = express.Router();

router.get(
  "/all-trips",
  auth(UserRole.USER, UserRole.ADMIN),
  TripControllers.getAllTrip
);

router.post(
  "/create",
  multerUpload.array("photos"),
  auth(UserRole.USER),
  TripControllers.createNewTrip
);

export const TripRoutes = router;
