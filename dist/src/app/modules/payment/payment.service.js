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
exports.PaymentServices = void 0;
const prisma_1 = require("../../../shared/prisma");
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const paymentSuccess = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = query;
    try {
        const result = yield prisma_1.prisma.$transaction((tnx) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield tnx.payment.findUniqueOrThrow({
                where: {
                    transactionId: transactionId,
                },
            });
            const plan = yield tnx.plan.findFirst({
                where: {
                    id: transaction.planId,
                },
            });
            if (!plan) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Plan Not Found");
            }
            yield tnx.payment.update({
                where: {
                    transactionId: transactionId,
                },
                data: {
                    status: "SUCCESS",
                },
            });
            const isPreviousPlanExists = yield tnx.subscription.findFirst({
                where: {
                    userId: transaction.userId,
                },
            });
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + plan.durationInDays);
            if (isPreviousPlanExists) {
                return yield tnx.subscription.update({
                    where: {
                        userId: transaction.userId,
                    },
                    data: {
                        planId: transaction.planId,
                        endDate,
                    },
                });
            }
            return yield tnx.subscription.create({
                data: {
                    userId: transaction.userId,
                    planId: transaction.planId,
                    endDate,
                },
            });
        }));
        return { success: true };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Payment Success Error");
    }
});
const paymentFail = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId } = query;
    try {
        const result = yield prisma_1.prisma.$transaction((tnx) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield tnx.payment.findUniqueOrThrow({
                where: {
                    transactionId: transactionId,
                },
            });
            const plan = yield tnx.plan.findFirst({
                where: {
                    id: transaction.planId,
                },
            });
            if (!plan) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Plan Not Found");
            }
            return yield tnx.payment.update({
                where: {
                    id: transaction.id,
                },
                data: {
                    status: "FAILED",
                },
            });
        }));
        return { success: true };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Payment Fail Error");
    }
});
exports.PaymentServices = {
    paymentSuccess,
    paymentFail,
};
//# sourceMappingURL=payment.service.js.map