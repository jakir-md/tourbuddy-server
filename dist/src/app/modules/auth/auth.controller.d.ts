import type { NextFunction, Request, Response } from "express";
export declare const AuthControllers: {
    loginUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    refreshToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMe: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=auth.controller.d.ts.map