"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchIndex = void 0;
const slug_generator_1 = require("./slug-generator");
const getSearchIndex = (title, startPoint, destination, itinerary) => {
    const locationArr = (0, slug_generator_1.getLocation)(itinerary);
    locationArr.push((0, slug_generator_1.getLowercaseString)(title));
    locationArr.push((0, slug_generator_1.getLowercaseString)(startPoint));
    locationArr.push((0, slug_generator_1.getLowercaseString)(destination));
    const temp = Array.from(new Set(locationArr));
    return temp.join("-");
};
exports.getSearchIndex = getSearchIndex;
//# sourceMappingURL=getSearchIndex.js.map