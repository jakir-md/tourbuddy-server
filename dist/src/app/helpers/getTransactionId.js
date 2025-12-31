"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionId = void 0;
const crypto_1 = __importDefault(require("crypto"));
const getTransactionId = () => {
    const randomString = crypto_1.default.randomBytes(12).toString("hex");
    return `tran_${randomString}`;
};
exports.getTransactionId = getTransactionId;
//# sourceMappingURL=getTransactionId.js.map