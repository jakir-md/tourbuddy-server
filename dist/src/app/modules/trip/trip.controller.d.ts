import type { Request, Response } from "express";
export declare const TripControllers: {
    createNewTrip: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getAllTrip: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    tripById: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    uploadImage: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    fetchTripsForApproval: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    updateStatus: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    fetchUserAllTrips: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    allStartPoint: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    reviewableTrips: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    allReviews: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    fetchUserTripForProfile: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    postReview: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    upcomingTrip: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    userAnalytics: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
    getTrendingTrips: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
};
//# sourceMappingURL=trip.controller.d.ts.map