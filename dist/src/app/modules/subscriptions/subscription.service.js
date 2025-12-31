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
exports.SubscriptionServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = require("../../../shared/prisma");
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const getTransactionId_1 = require("../../helpers/getTransactionId");
const sslCommerz_service_1 = require("../sslCommerz/sslCommerz.service");
const createNewSubscriptionPlan = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.plan.create({
            data: payload,
        });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const getAllPlans = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.prisma.plan.findMany();
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
const upgradeSubscription = (_a) => __awaiter(void 0, [_a], void 0, function* ({ planId, userId, amount, }) {
    const isUserExists = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
    });
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User Not Found");
    }
    const transactionId = (0, getTransactionId_1.getTransactionId)();
    try {
        const result = yield prisma_1.prisma.payment.create({
            data: {
                planId,
                userId,
                amount,
                transactionId,
            },
        });
        const sslPayload = {
            address: "Address",
            amount,
            transactionId: result.transactionId,
            email: isUserExists.email,
            name: isUserExists.name,
        };
        const sslpayment = yield (0, sslCommerz_service_1.sslPaymentInit)(sslPayload);
        return {
            paymentURL: sslpayment.GatewayPageURL,
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
exports.SubscriptionServices = {
    createNewSubscriptionPlan,
    upgradeSubscription,
    getAllPlans,
};
//# sourceMappingURL=subscription.service.js.map