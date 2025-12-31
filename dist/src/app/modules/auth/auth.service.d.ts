export declare const AuthServices: {
    loginUser: ({ email, password, }: {
        email: string;
        password: string;
    }) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    newRefreshBothTokens: (token: string) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getMe: (user: any) => Promise<{
        email: string;
        id: string;
        name: string;
        profilePhoto: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        isVerified: boolean;
        bio: string | null;
        age: number | null;
        gender: string | null;
        interests: string[];
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map