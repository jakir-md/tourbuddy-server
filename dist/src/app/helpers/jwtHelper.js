import jwt from "jsonwebtoken";
export const generateToken = (payload, secret, expiresIn) => {
    const token = jwt.sign(payload, secret, {
        expiresIn: expiresIn,
        algorithm: "HS256",
    });
    return token;
};
export const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};
//# sourceMappingURL=jwtHelper.js.map