import type { IPaginationOptions } from "../../interfaces/pagination";
import type { ITripFilterRequest } from "./trip.interface";
import { ApproveStatus, type Prisma } from "@prisma/client";
export declare const TripServices: {
    createNewTrip: (payload: any) => Promise<{
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
        slug: string;
        budget: number;
        approveStatus: import(".prisma/client").$Enums.ApproveStatus;
        locationData: Prisma.JsonValue | null;
        itinerary: Prisma.JsonValue | null;
        activities: string[];
        bannerImage: string | null;
    }>;
    getAllTrip: (filters: ITripFilterRequest, options: IPaginationOptions) => Promise<{
        id: string;
        user: {
            name: string;
            profilePhoto: string;
            isVerified: boolean;
        };
        startDate: string;
        endDate: string;
        description: string;
        category: import(".prisma/client").$Enums.TripCategory;
        destination: string;
        title: string;
        slug: string;
        budget: number;
        activities: string[];
        bannerImage: string;
    }[]>;
    tripById: (id: string) => Promise<{
        photos: string[];
        id: string;
        user: {
            id: string;
            name: string;
            profilePhoto: string;
            isVerified: boolean;
        };
        startDate: string;
        endDate: string;
        description: string;
        category: import(".prisma/client").$Enums.TripCategory;
        destination: string;
        title: string;
        budget: number;
        itinerary: Prisma.JsonValue;
        activities: string[];
        bannerImage: string;
    }>;
    fetchTripsForApproval: () => Promise<{
        id: string;
        user: {
            email: string;
            id: string;
            username: string;
            name: string;
            profilePhoto: string;
        };
        trip: {
            title: string;
            slug: string;
            bannerImage: string;
        };
        approveStatus: import(".prisma/client").$Enums.ApproveStatus;
    }[]>;
    updateStatus: ({ approvalId, moderatorId, status, message, }: {
        approvalId: string;
        moderatorId: string;
        status: ApproveStatus;
        message: string;
    }) => Promise<any>;
    fetchUserAllTrips: (userId: string) => Promise<{
        id: string;
        message: string;
        trip: {
            title: string;
            slug: string;
            bannerImage: string;
        };
        approveStatus: import(".prisma/client").$Enums.ApproveStatus;
    }[]>;
    allStartPoint: () => Promise<any>;
    reviewableTrips: ({ tripAdminId, attendeeId, }: {
        tripAdminId: string;
        attendeeId: string;
    }) => Promise<{
        trip: {
            id: string;
            startDate: string;
            title: string;
        };
    }[]>;
    allReviews: (targetId: string) => Promise<{
        createdAt: Date;
        trip: {
            title: string;
        };
        rating: number;
        comment: string;
        author: {
            name: string;
            profilePhoto: string;
        };
    }[]>;
    fetchUserTripForProfile: (userId: string) => Promise<{
        id: string;
        user: {
            name: string;
            profilePhoto: string;
            isVerified: boolean;
        };
        startDate: string;
        endDate: string;
        category: import(".prisma/client").$Enums.TripCategory;
        destination: string;
        title: string;
        slug: string;
        budget: number;
        activities: string[];
        bannerImage: string;
    }[]>;
    postReview: (payload: any) => Promise<{
        id: string;
        createdAt: Date;
        tripId: string;
        rating: number;
        comment: string;
        authorId: string;
        targetId: string;
    }>;
    upComingTrip: (userId: string) => Promise<{
        id: string;
        startDate: string;
        endDate: string;
        title: string;
        slug: string;
        approveStatus: import(".prisma/client").$Enums.ApproveStatus;
        bannerImage: string;
    }>;
    userAnalytics: (userId: string) => Promise<{
        tripsCreated: number;
        tripsJoined: number;
    }>;
    getTrendingTrips: () => Promise<{
        id: string;
        user: {
            name: string;
            profilePhoto: string;
            isVerified: boolean;
        };
        startDate: string;
        endDate: string;
        description: string;
        category: import(".prisma/client").$Enums.TripCategory;
        destination: string;
        title: string;
        slug: string;
        budget: number;
        activities: string[];
        bannerImage: string;
    }[]>;
};
//# sourceMappingURL=trip.service.d.ts.map