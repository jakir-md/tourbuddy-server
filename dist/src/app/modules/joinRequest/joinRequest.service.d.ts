export declare const JoinRequestServices: {
    getStatus: (userId: string, tripId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.RequestStatus;
        message: string | null;
        tripAdminId: string;
        attendeeId: string;
        tripId: string;
    }>;
    acceptRequestForJoining: (userId: string, tripId: string, adminId: string) => Promise<{
        success: boolean;
    }>;
    rejectJoinRequest: (userId: string, tripId: string, adminId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.RequestStatus;
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
            category: import(".prisma/client").$Enums.TripCategory;
            destination: string;
            title: string;
            itinerary: import("@prisma/client/runtime/client").JsonValue | null;
            slug: string;
            budget: number;
            approveStatus: import(".prisma/client").$Enums.ApproveStatus;
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
            role: import(".prisma/client").$Enums.UserRole;
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
            role: import(".prisma/client").$Enums.UserRole;
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
        status: import(".prisma/client").$Enums.RequestStatus;
        message: string | null;
        tripAdminId: string;
        attendeeId: string;
        tripId: string;
    }>;
    gtAllRequests: (adminId: string) => Promise<{
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        trip: {
            id: string;
            destination: string;
            title: string;
            slug: string;
            bannerImage: string;
        };
        attendee: {
            email: string;
            id: string;
            username: string;
            name: string;
            profilePhoto: string;
        };
    }[]>;
    joinedUserProfiles: (slug: string) => Promise<{
        attendee: {
            id: string;
            name: string;
            profilePhoto: string;
            isVerified: boolean;
        };
    }[]>;
    joinedTrips: (userId: string) => Promise<{
        trip: {
            id: string;
            startDate: string;
            endDate: string;
            title: string;
            slug: string;
            approveStatus: import(".prisma/client").$Enums.ApproveStatus;
            bannerImage: string;
        };
    }[]>;
};
//# sourceMappingURL=joinRequest.service.d.ts.map