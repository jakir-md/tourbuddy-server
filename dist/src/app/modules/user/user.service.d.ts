export declare const UserServices: {
    registerUser: (payload: any) => Promise<{
        email: string;
        password: string;
        id: string;
        username: string;
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
    verifyWithKYC: (payload: any) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.ApproveStatus;
        fbPageLink: string | null;
        facebookProfileLink: string | null;
        selfieImage: string;
        nidFront: string;
        nidBack: string;
        message: string | null;
        utilityBill: string;
        moderatorId: string | null;
    }>;
    verificationStatus: (userId: string) => Promise<{
        status: import(".prisma/client").$Enums.ApproveStatus;
        message: string;
    }>;
    getAllVerifyRequests: () => Promise<{
        id: string;
        user: {
            email: string;
            id: string;
            username: string;
            name: string;
            profilePhoto: string;
        };
        status: import(".prisma/client").$Enums.ApproveStatus;
        fbPageLink: string;
        facebookProfileLink: string;
        selfieImage: string;
        nidFront: string;
        nidBack: string;
        utilityBill: string;
        moderator: {
            email: string;
            id: string;
            username: string;
            name: string;
            profilePhoto: string;
        };
    }[]>;
    updateVerifyRequests: (payload: any) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.ApproveStatus;
        fbPageLink: string | null;
        facebookProfileLink: string | null;
        selfieImage: string;
        nidFront: string;
        nidBack: string;
        message: string | null;
        utilityBill: string;
        moderatorId: string | null;
    }>;
    userInfoById: (id: string) => Promise<{
        username: string;
        name: string;
        profilePhoto: string;
        isVerified: boolean;
        createdAt: Date;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map