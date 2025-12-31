import type { IPaginationOptions } from "../../interfaces/pagination";
import type { ITripFilterRequest } from "./trip.interface";
import { ApproveStatus } from "../../../../generated/prisma/client";
export declare const TripServices: {
    createNewTrip: (payload: any) => Promise<null>;
    getAllTrip: (filters: ITripFilterRequest, options: IPaginationOptions) => Promise<{
        id: string;
        user: {
            name: string;
            profilePhoto: string | null;
            isVerified: boolean;
        };
        startDate: string;
        endDate: string;
        category: import("../../../../generated/prisma/enums").TripCategory;
        destination: string;
        title: string;
        slug: string;
        budget: number;
        activities: string[];
        bannerImage: string | null;
    }[]>;
    tripById: (id: string) => Promise<{
        photos: string[];
        id?: string;
        user?: {
            id: string;
            name: string;
            profilePhoto: string | null;
            isVerified: boolean;
        };
        startDate?: string;
        endDate?: string;
        category?: import("../../../../generated/prisma/enums").TripCategory;
        destination?: string;
        title?: string;
        itinerary?: import("@prisma/client/runtime/client").JsonValue;
        budget?: number;
        activities?: string[];
        bannerImage?: string | null;
    }>;
    fetchTripsForApproval: () => Promise<{
        id: string;
        user: {
            email: string;
            id: string;
            username: string;
            name: string;
            profilePhoto: string | null;
        };
        trip: {
            title: string;
            slug: string;
            bannerImage: string | null;
        };
        approveStatus: ApproveStatus;
    }[]>;
    updateStatus: ({ approvalId, moderatorId, status, message, }: {
        approvalId: string;
        moderatorId: string;
        status: ApproveStatus;
        message: string;
    }) => Promise<null | undefined>;
    fetchUserAllTrips: (userId: string) => Promise<{
        id: string;
        message: string | null;
        trip: {
            title: string;
            slug: string;
            bannerImage: string | null;
        };
        approveStatus: ApproveStatus;
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
    }[] | undefined>;
    allReviews: (targetId: string) => Promise<{
        trip: {
            title: string;
        };
        rating: number;
        comment: string;
        author: {
            name: string;
            profilePhoto: string | null;
        };
    }[] | undefined>;
    fetchUserTripForProfile: (userId: string) => Promise<{
        id: string;
        user: {
            name: string;
            profilePhoto: string | null;
            isVerified: boolean;
        };
        startDate: string;
        endDate: string;
        category: import("../../../../generated/prisma/enums").TripCategory;
        destination: string;
        title: string;
        slug: string;
        budget: number;
        activities: string[];
        bannerImage: string | null;
    }[] | undefined>;
    postReview: (payload: any) => Promise<{
        id: string;
        createdAt: Date;
        tripId: string;
        rating: number;
        comment: string;
        authorId: string;
        targetId: string;
    } | undefined>;
    upComingTrip: (userId: string) => Promise<{
        id: string;
        startDate: string;
        endDate: string;
        title: string;
        slug: string;
        approveStatus: ApproveStatus;
        bannerImage: string | null;
    } | null | undefined>;
    userAnalytics: (userId: string) => Promise<{
        tripsCreated: number;
        tripsJoined: number;
    } | undefined>;
};
//# sourceMappingURL=trip.service.d.ts.map