import type { Request, Response } from "express";
export declare const SubscriptionControllers: {
    createNewSubscriptionPlan: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    upgradeSubscription: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllPlans: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=subscription.controller.d.ts.map