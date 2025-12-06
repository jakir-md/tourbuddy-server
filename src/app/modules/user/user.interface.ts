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


export enum UserRole {
    USER,
    MODERATOR,
    ADMIN
}

export enum SubscriptionStatus {
    PENDING,
    ACCEPTED,
    REJECTED
}

export enum TripType {
    SOLO,
    BACKPACKING,
    LUXURY,
    BUSINESS,
    FAMILY
}