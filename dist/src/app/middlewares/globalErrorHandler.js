import { Prisma } from "@prisma/client";
import httpStatus from "http-status";
const sanitizeError = (error) => {
    if (process.env.NODE_ENV === "production" && error.code?.startsWith("P")) {
        return {
            message: "Database operation failed",
            errorDetails: null,
        };
    }
    return error;
};
const globalErrorHandler = (err, req, res, next) => {
    console.log({ err });
    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || "Something went wrong!";
    let error = err;
    if (err instanceof Prisma.PrismaClientValidationError) {
        message = "Validation Error";
        error = err.message;
    }
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            message = "Duplicate Key error";
            error = err.meta;
        }
    }
    // Sanitize error before sending response
    const sanitizedError = sanitizeError(error);
    res.status(statusCode).json({
        success,
        message,
        error: sanitizedError,
    });
};
export default globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.js.map