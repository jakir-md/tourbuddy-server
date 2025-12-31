import type { Request, Response } from "express";
export declare const JoinRequestControllers: {
    getStatus: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    acceptRequestForJoining: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    rejectJoinRequest: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    requestForJoining: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    gtAllRequests: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    joinedUserProfiles: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    joinedTrips: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=joinRequest.controller.d.ts.map