"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const trip_service_1 = require("./trip.service");
const trip_constants_1 = require("./trip.constants");
const pick_1 = __importDefault(require("../../helpers/pick"));
const createNewTrip = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // const body = JSON.parse(req.body.data);
    // const activities = body.activities.split(",");
    const body = req.body;
    // const itinerary = JSON.stringify(body.itinerary);
    const reqBody = Object.assign(Object.assign({}, body), { 
        // itinerary,
        userId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId });
    // const files = req.files as Express.Multer.File[];
    // const images = files.map((file) => file.path);
    const result = yield trip_service_1.TripServices.createNewTrip(reqBody);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Trip created successfuly!",
        data: result,
    });
}));
const getAllTrip = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, trip_constants_1.tripFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield trip_service_1.TripServices.getAllTrip(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All Trips fetched successfuly!",
        data: result,
    });
}));
const tripById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield trip_service_1.TripServices.tripById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Trip fetched successfuly!",
        data: result,
    });
}));
const uploadImage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Trip fetched successfuly!",
        data: result,
    });
}));
const fetchTripsForApproval = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trip_service_1.TripServices.fetchTripsForApproval();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Trip approvals fetched successfuly!",
        data: result,
    });
}));
const fetchUserAllTrips = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield trip_service_1.TripServices.fetchUserAllTrips(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Trip approvals fetched successfuly!",
        data: result,
    });
}));
const updateStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const moderatorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const payload = Object.assign(Object.assign({}, req.body), { moderatorId });
    const result = yield trip_service_1.TripServices.updateStatus(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Trip Status updated successfuly!",
        data: result,
    });
}));
const reviewableTrips = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const tripAdminId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.adminId;
    const attendeeId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
    const result = yield trip_service_1.TripServices.reviewableTrips({
        tripAdminId,
        attendeeId,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Reviewable trips fetched successfuly!",
        data: result,
    });
}));
const allReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const targetId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield trip_service_1.TripServices.allReviews(targetId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All Reviews Retrieved successfuly!",
        data: result,
    });
}));
const postReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authorId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const payload = Object.assign(Object.assign({}, req.body), { authorId });
    const result = yield trip_service_1.TripServices.postReview(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Review posted successfuly!",
        data: result,
    });
}));
const allStartPoint = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trip_service_1.TripServices.allStartPoint();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Trip Status updated successfuly!",
        data: result,
    });
}));
const fetchUserTripForProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const result = yield trip_service_1.TripServices.fetchUserTripForProfile(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Profile Trips fetched successfuly!",
        data: result,
    });
}));
const upcomingTrip = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield trip_service_1.TripServices.upComingTrip(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Upcoming Trip fetched successfuly!",
        data: result,
    });
}));
const userAnalytics = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const result = yield trip_service_1.TripServices.userAnalytics(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Upcoming Trip fetched successfuly!",
        data: result,
    });
}));
const getTrendingTrips = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trip_service_1.TripServices.getTrendingTrips();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Upcoming Trip fetched successfuly!",
        data: result,
    });
}));
exports.TripControllers = {
    createNewTrip,
    getAllTrip,
    tripById,
    uploadImage,
    fetchTripsForApproval,
    updateStatus,
    fetchUserAllTrips,
    allStartPoint,
    reviewableTrips,
    allReviews,
    fetchUserTripForProfile,
    postReview,
    upcomingTrip,
    userAnalytics,
    getTrendingTrips,
};
//# sourceMappingURL=trip.controller.js.map