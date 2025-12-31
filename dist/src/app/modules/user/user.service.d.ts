export declare const UserServices: {
    registerUser: (payload: any) => Promise<{
        email: string;
        password: string;
        id: string;
        username: string;
        name: string;
        profilePhoto: string | null;
        role: import("../../../../generated/prisma/enums").UserRole;
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
        status: import("../../../../generated/prisma/enums").ApproveStatus;
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
        status: import("../../../../generated/prisma/enums").ApproveStatus;
        message: string | null;
    } | null>;
    getAllVerifyRequests: () => Promise<{
        id: string;
        user: {
            email: string;
            id: string;
            username: string;
            name: string;
            profilePhoto: string | null;
        };
        status: import("../../../../generated/prisma/enums").ApproveStatus;
        fbPageLink: string | null;
        facebookProfileLink: string | null;
        selfieImage: string;
        nidFront: string;
        nidBack: string;
        utilityBill: string;
        moderator: {
            email: string;
            id: string;
            username: string;
            name: string;
            profilePhoto: string | null;
        } | null;
    }[]>;
    updateVerifyRequests: (payload: any) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import("../../../../generated/prisma/enums").ApproveStatus;
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
        profilePhoto: string | null;
        isVerified: boolean;
        createdAt: Date;
    } | null>;
};
//# sourceMappingURL=user.service.d.ts.map