import crypto from "crypto";
export const getTransactionId = () => {
    const randomString = crypto.randomBytes(12).toString("hex");
    return `tran_${randomString}`;
};
//# sourceMappingURL=getTransactionId.js.map