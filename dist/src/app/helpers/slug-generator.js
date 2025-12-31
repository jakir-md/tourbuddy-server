import crypto from "crypto";
export function generateSlug(startPoint, destination, itinerary) {
    const starting = getLowercaseString(startPoint);
    const ending = getLowercaseString(destination);
    const locationString = getLocation(itinerary).join("-").substring(15);
    const base = `${starting}-to-${ending}-${locationString}`;
    const random = crypto.randomBytes(4).toString("hex");
    return `${base}-${random}`;
}
export const getLocation = (itinerary) => {
    const locations = [];
    itinerary.forEach((day) => {
        day.activities.forEach((activity) => {
            locations.push(getLowercaseString(activity.location));
        });
    });
    return locations;
};
export const getLowercaseString = (item) => {
    return item
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
};
//# sourceMappingURL=slug-generator.js.map