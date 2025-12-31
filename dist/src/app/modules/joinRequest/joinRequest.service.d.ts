import { RequestStatus } from "../../../../generated/prisma/enums";
export declare const JoinRequestServices: {
    getStatus: (userId: string, tripId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: RequestStatus;
        message: string | null;
        tripAdminId: string;
        attendeeId: string;
        tripId: string;
    } | null>;
    acceptRequestForJoining: (userId: string, tripId: string, adminId: string) => Promise<{
        success: boolean;
    }>;
    rejectJoinRequest: (userId: string, tripId: string, adminId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: RequestStatus;
        message: string | null;
        tripAdminId: string;
        attendeeId: string;
        tripId: string;
    }>;
    requestForJoining: (userId: string, tripId: string, adminId: string) => Promise<{
        trip: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            startDate: string;
            endDate: string;
            description: string;
            searchIndex: string;
            startPoint: string;
            category: import("../../../../generated/prisma/enums").TripCategory;
            destination: string;
            title: string;
            itinerary: import("@prisma/client/runtime/client").JsonValue | null;
            slug: string;
            budget: number;
            approveStatus: import("../../../../generated/prisma/enums").ApproveStatus;
            locationData: import("@prisma/client/runtime/client").JsonValue | null;
            activities: string[];
            bannerImage: string | null;
        };
        attendee: {
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
        };
        admin: {
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
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: RequestStatus;
        message: string | null;
        tripAdminId: string;
        attendeeId: string;
        tripId: string;
    }>;
    gtAllRequests: (adminId: string) => Promise<{
        id: string;
        status: RequestStatus;
        trip: {
            id: string;
            destination: string;
            title: string;
            slug: string;
            bannerImage: string | null;
        };
        attendee: {
            email: string;
            id: string;
            username: string;
            name: string;
            profilePhoto: string | null;
        };
    }[]>;
    joinedUserProfiles: (slug: string) => Promise<{
        attendee: {
            id: string;
            name: string;
            profilePhoto: string | null;
            isVerified: boolean;
        };
    }[] | undefined>;
    joinedTrips: (userId: string) => Promise<{
        trip: {
            id: string;
            startDate: string;
            endDate: string;
            title: string;
            slug: string;
            approveStatus: import("../../../../generated/prisma/enums").ApproveStatus;
            bannerImage: string | null;
        };
    }[] | undefined>;
};
//# sourceMappingURL=joinRequest.service.d.ts.map