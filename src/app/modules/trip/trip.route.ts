import express from "express";
import { auth } from "../../middlewares/auth";
import { TripControllers } from "./trip.controller";
import { multerUpload } from "../../../config/multer.config";
import { UserRole } from "@prisma/client";
const router = express.Router();

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

router.post("/reviews", auth(UserRole.USER), TripControllers.postReview);

router.post("/create", auth(UserRole.USER), TripControllers.createNewTrip);

router.post(
  "/update-status",
  auth(UserRole.MODERATOR, UserRole.ADMIN),
  TripControllers.updateStatus
);

router.get(
  "/reviewable-trips/:adminId",
  auth(UserRole.USER, UserRole.MODERATOR),
  TripControllers.reviewableTrips
);

router.get("/profile-trips/:id", TripControllers.fetchUserTripForProfile);
router.get("/upcoming-trip", auth(UserRole.USER), TripControllers.upcomingTrip);
router.get("/user-analytics", auth(UserRole.USER), TripControllers.userAnalytics);

router.get(
  "/reviews/:id",
  auth(UserRole.USER, UserRole.MODERATOR),
  TripControllers.allReviews
);

router.get("/:id", TripControllers.tripById);


router.post(
  "/upload-image",
  multerUpload.single("file"),
  TripControllers.uploadImage
);

export const TripRoutes = router;
