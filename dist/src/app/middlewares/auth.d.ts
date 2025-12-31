import type { NextFunction, Request, Response } from "express";
import type { IVerifiedUser } from "../interfaces/verfiedUser";
export declare const auth: (...authRoles: string[]) => (req: Request & {
    user?: IVerifiedUser;
}, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map