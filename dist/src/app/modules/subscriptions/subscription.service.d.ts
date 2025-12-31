export declare const SubscriptionServices: {
    createNewSubscriptionPlan: (payload: any) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        description: string;
        price: number;
        durationInDays: number;
        limits: import("@prisma/client/runtime/client").JsonValue;
        isActive: boolean;
    }>;
    upgradeSubscription: ({ planId, userId, amount, }: {
        planId: string;
        userId: string;
        amount: number;
    }) => Promise<{
        paymentURL: any;
    }>;
    getAllPlans: () => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        description: string;
        price: number;
        durationInDays: number;
        limits: import("@prisma/client/runtime/client").JsonValue;
        isActive: boolean;
    }[]>;
};
//# sourceMappingURL=subscription.service.d.ts.map