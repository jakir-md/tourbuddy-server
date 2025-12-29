import express from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";
import { TripControllers } from "./trip.controller";
import { multerUpload } from "../../../config/multer.config";
const router = express.Router();

router.get(
  "/profile-trips/:id",
  TripControllers.fetchUserTripForProfile
);

router.get("/startPoints", TripControllers.allStartPoint);

router.get("/all-trips", TripControllers.getAllTrip);

router.get(
  "/user-trips",
  auth(UserRole.USER),
  TripControllers.fetchUserAllTrips
);


router.get(
  "/pending-approvals",
  auth(UserRole.MODERATOR, UserRole.ADMIN),
  TripControllers.fetchTripsForApproval
);

router.get("/:id", TripControllers.tripById);

router.get(
  "/reviewable-trips/:adminId",
  auth(UserRole.USER, UserRole.MODERATOR),
  TripControllers.reviewableTrips
);

router.get("/reviews/:id", auth(UserRole.USER, UserRole.MODERATOR), TripControllers.allReviews);

router.post("/reviews", auth(UserRole.USER), TripControllers.postReview);

router.post("/create", auth(UserRole.USER), TripControllers.createNewTrip);

router.post(
  "/update-status",
  auth(UserRole.MODERATOR, UserRole.ADMIN),
  TripControllers.updateStatus
);

router.post(
  "/upload-image",
  multerUpload.single("file"),
  TripControllers.uploadImage
);

export const TripRoutes = router;
