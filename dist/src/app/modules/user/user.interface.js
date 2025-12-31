"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripType = exports.SubscriptionStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole[UserRole["USER"] = 0] = "USER";
    UserRole[UserRole["MODERATOR"] = 1] = "MODERATOR";
    UserRole[UserRole["ADMIN"] = 2] = "ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus[SubscriptionStatus["PENDING"] = 0] = "PENDING";
    SubscriptionStatus[SubscriptionStatus["ACCEPTED"] = 1] = "ACCEPTED";
    SubscriptionStatus[SubscriptionStatus["REJECTED"] = 2] = "REJECTED";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
var TripType;
(function (TripType) {
    TripType[TripType["SOLO"] = 0] = "SOLO";
    TripType[TripType["BACKPACKING"] = 1] = "BACKPACKING";
    TripType[TripType["LUXURY"] = 2] = "LUXURY";
    TripType[TripType["BUSINESS"] = 3] = "BUSINESS";
    TripType[TripType["FAMILY"] = 4] = "FAMILY";
})(TripType || (exports.TripType = TripType = {}));
//# sourceMappingURL=user.interface.js.map