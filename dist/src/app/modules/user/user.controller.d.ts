import type { Request, Response } from "express";
export declare const UserControllers: {
    registerUser: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    userInfoById: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    verifyWithKYC: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    verificationStatus: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllVerifyRequests: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateVerifyRequest: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=user.controller.d.ts.map