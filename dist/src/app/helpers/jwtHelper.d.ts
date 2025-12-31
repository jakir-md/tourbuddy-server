import type { JwtPayload, Secret } from "jsonwebtoken";
export declare const generateToken: (payload: any, secret: Secret, expiresIn: string) => string;
export declare const verifyToken: (token: string, secret: Secret) => JwtPayload;
//# sourceMappingURL=jwtHelper.d.ts.map