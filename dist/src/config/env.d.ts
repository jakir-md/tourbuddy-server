interface EnvConfig {
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_ACCESS_TOKEN_EXPIRES: string;
    JWT_REFRESH_TOKEN_EXPIRES: string;
    NODE_ENV: string;
    BCRYPT_SALT_ROUND: string;
    FRONT_END_URL: string;
    DB_URL: string;
    PORT: string;
    EXPRESS_SESSION_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    ADMIN_EMAIL: string;
    ADMIN_PASS: string;
    SSL_STORE_ID: string;
    SSL_STORE_PASS: string;
    SSL_PAYMENT_API: string;
    SSL_VALIDATION_API: string;
    SSL_SUCCESS_BACKEND_URL: string;
    SSL_FAIL_BACKEND_URL: string;
    SSL_CANCEL_BACKEND_URL: string;
    SSL_SUCCESS_FRONTEND_URL: string;
    SSL_FAIL_FRONTEND_URL: string;
    SSL_CANCEL_FRONTEND_URL: string;
    SSL_IPN_URL: string;
    SMTP_PASS: string;
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_USER: string;
    SMTP_FROM: string;
}
export declare const EnvVars: Partial<EnvConfig>;
export {};
//# sourceMappingURL=env.d.ts.map