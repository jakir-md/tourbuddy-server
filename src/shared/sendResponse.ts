import type { Response } from "express";

export const sendResponse = <T>(response: Response, jsonData: {
    statusCode: number,
    success: boolean,
    message: string,
    meta?: {
        total: number,
        limit: number,
        page: number
    },
    data: T
}) => {
    response.status(jsonData.statusCode).json({
        message: jsonData.message,
        success: jsonData.success,
        meta: jsonData.meta || null || undefined,
        data: jsonData.data || null || undefined
    })
}