"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinRequestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const joinRequest_controller_1 = require("./joinRequest.controller");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/status", (0, auth_1.auth)(client_1.UserRole.USER), joinRequest_controller_1.JoinRequestControllers.getStatus);
router.post("/accept", (0, auth_1.auth)(client_1.UserRole.USER), joinRequest_controller_1.JoinRequestControllers.acceptRequestForJoining);
router.post("/reject", (0, auth_1.auth)(client_1.UserRole.USER), joinRequest_controller_1.JoinRequestControllers.rejectJoinRequest);
router.post("/request", (0, auth_1.auth)(client_1.UserRole.USER), joinRequest_controller_1.JoinRequestControllers.requestForJoining);
router.get("/joined-trips", (0, auth_1.auth)(client_1.UserRole.USER), joinRequest_controller_1.JoinRequestControllers.joinedTrips);
router.get("/", (0, auth_1.auth)(client_1.UserRole.USER), joinRequest_controller_1.JoinRequestControllers.gtAllRequests);
router.get("/joined-profiles/:slug", (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.MODERATOR, client_1.UserRole.USER), joinRequest_controller_1.JoinRequestControllers.joinedUserProfiles);
exports.JoinRequestRoutes = router;
//# sourceMappingURL=joinRequest.route.js.map