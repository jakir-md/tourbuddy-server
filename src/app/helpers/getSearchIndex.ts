import { getLocation, getLowercaseString } from "./slug-generator";

export const getSearchIndex = (
  title: string,
  startPoint: string,
  destination: string,
  itinerary: any
) => {
  const locationArr = getLocation(itinerary);
  locationArr.push(getLowercaseString(title));
  locationArr.push(getLowercaseString(startPoint));
  locationArr.push(getLowercaseString(destination));
  const temp = Array.from(new Set(locationArr));
  return temp.join("-");
};