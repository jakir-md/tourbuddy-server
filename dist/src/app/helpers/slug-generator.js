"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLowercaseString = exports.getLocation = void 0;
exports.generateSlug = generateSlug;
const crypto_1 = __importDefault(require("crypto"));
function generateSlug(startPoint, destination, itinerary) {
    const starting = (0, exports.getLowercaseString)(startPoint);
    const ending = (0, exports.getLowercaseString)(destination);
    const locationString = (0, exports.getLocation)(itinerary).join("-").substring(15);
    const base = `${starting}-to-${ending}-${locationString}`;
    const random = crypto_1.default.randomBytes(4).toString("hex");
    return `${base}-${random}`;
}
const getLocation = (itinerary) => {
    const locations = [];
    itinerary.forEach((day) => {
        day.activities.forEach((activity) => {
            locations.push((0, exports.getLowercaseString)(activity.location));
        });
    });
    return locations;
};
exports.getLocation = getLocation;
const getLowercaseString = (item) => {
    return item
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
};
exports.getLowercaseString = getLowercaseString;
//# sourceMappingURL=slug-generator.js.map