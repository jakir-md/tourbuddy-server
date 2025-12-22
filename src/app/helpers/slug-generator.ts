import crypto from "crypto";

export function generateSlug(
  startPoint: string,
  destination: string,
  itinerary: any
): string {
  const starting = getLowercaseString(startPoint);
  const ending = getLowercaseString(destination);
  const locationString = getLocation(itinerary).join("-").substring(15);
  const base = `${starting}-to-${ending}-${locationString}`;
  const random = crypto.randomBytes(4).toString("hex");
  return `${base}-${random}`;
}

export const getLocation = (itinerary: any) => {
  const locations: string[] = [];
  itinerary.forEach((day: any) => {
    day.activities.forEach((activity: any) => {
      locations.push(getLowercaseString(activity.location));
    });
  });
  return locations;
};

export const getLowercaseString = (item: any) => {
  return item
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};
