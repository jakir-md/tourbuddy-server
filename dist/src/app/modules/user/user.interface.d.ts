export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    image?: string;
    role: UserRole;
    isVerified: boolean;
    bio?: string;
    age?: number;
    gender?: string;
    interests: string[];
    subscriptionStatus: SubscriptionStatus;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum UserRole {
    USER = 0,
    MODERATOR = 1,
    ADMIN = 2
}
export declare enum SubscriptionStatus {
    PENDING = 0,
    ACCEPTED = 1,
    REJECTED = 2
}
export declare enum TripType {
    SOLO = 0,
    BACKPACKING = 1,
    LUXURY = 2,
    BUSINESS = 3,
    FAMILY = 4
}
//# sourceMappingURL=user.interface.d.ts.map