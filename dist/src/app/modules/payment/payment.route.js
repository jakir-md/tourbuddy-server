"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
router.post("/success", payment_controller_1.PaymentControllers.paymentSuccess);
router.post("/fail", payment_controller_1.PaymentControllers.paymentFail);
exports.PaymentRoutes = router;
//# sourceMappingURL=payment.route.js.map