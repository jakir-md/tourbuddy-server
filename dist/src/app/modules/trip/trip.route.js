"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const trip_controller_1 = require("./trip.controller");
const multer_config_1 = require("../../../config/multer.config");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/startPoints", trip_controller_1.TripControllers.allStartPoint);
router.get("/all-trips", trip_controller_1.TripControllers.getAllTrip);
router.get("/trending-trips", trip_controller_1.TripControllers.getTrendingTrips);
router.get("/user-trips", (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.ADMIN), trip_controller_1.TripControllers.fetchUserAllTrips);
router.get("/pending-approvals", (0, auth_1.auth)(client_1.UserRole.MODERATOR, client_1.UserRole.ADMIN), trip_controller_1.TripControllers.fetchTripsForApproval);
router.post("/reviews", (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.ADMIN), trip_controller_1.TripControllers.postReview);
router.post("/create", (0, auth_1.auth)(client_1.UserRole.USER), trip_controller_1.TripControllers.createNewTrip);
router.post("/update-status", (0, auth_1.auth)(client_1.UserRole.MODERATOR, client_1.UserRole.ADMIN), trip_controller_1.TripControllers.updateStatus);
router.get("/reviewable-trips/:adminId", (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.MODERATOR), trip_controller_1.TripControllers.reviewableTrips);
router.get("/profile-trips/:id", trip_controller_1.TripControllers.fetchUserTripForProfile);
router.get("/upcoming-trip", (0, auth_1.auth)(client_1.UserRole.USER), trip_controller_1.TripControllers.upcomingTrip);
router.get("/user-analytics/:id", (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.MODERATOR, client_1.UserRole.ADMIN), trip_controller_1.TripControllers.userAnalytics);
router.get("/reviews/:id", (0, auth_1.auth)(client_1.UserRole.USER, client_1.UserRole.MODERATOR, client_1.UserRole.ADMIN), trip_controller_1.TripControllers.allReviews);
router.get("/:id", trip_controller_1.TripControllers.tripById);
router.post("/upload-image", multer_config_1.multerUpload.single("file"), trip_controller_1.TripControllers.uploadImage);
exports.TripRoutes = router;
//# sourceMappingURL=trip.route.js.map