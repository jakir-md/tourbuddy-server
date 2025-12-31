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
exports.JoinRequestControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const joinRequest_service_1 = require("./joinRequest.service");
const getStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { tripId } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield joinRequest_service_1.JoinRequestServices.getStatus(userId, tripId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Subscription Payment Completed successfuly!",
        data: result,
    });
}));
const acceptRequestForJoining = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { tripId, userId } = req.body;
    const adminId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield joinRequest_service_1.JoinRequestServices.acceptRequestForJoining(userId, tripId, adminId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: result.success,
        message: "Request Accepted successfuly!",
        data: null,
    });
}));
const rejectJoinRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId, tripId } = req.body;
    const adminId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield joinRequest_service_1.JoinRequestServices.rejectJoinRequest(userId, tripId, adminId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Request Granted successfuly!",
        data: result,
    });
}));
const requestForJoining = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { tripId, adminId } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield joinRequest_service_1.JoinRequestServices.requestForJoining(userId, tripId, adminId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Request Granted successfuly!",
        data: result,
    });
}));
const gtAllRequests = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const adminId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield joinRequest_service_1.JoinRequestServices.gtAllRequests(adminId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Request Granted successfuly!",
        data: result,
    });
}));
const joinedUserProfiles = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.slug;
    const result = yield joinRequest_service_1.JoinRequestServices.joinedUserProfiles(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Profile Trips fetched successfuly!",
        data: result,
    });
}));
const joinedTrips = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield joinRequest_service_1.JoinRequestServices.joinedTrips(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Trips joined by me retrieved successfuly!",
        data: result,
    });
}));
exports.JoinRequestControllers = {
    getStatus,
    acceptRequestForJoining,
    rejectJoinRequest,
    requestForJoining,
    gtAllRequests,
    joinedUserProfiles,
    joinedTrips,
};
//# sourceMappingURL=joinRequest.controller.js.map