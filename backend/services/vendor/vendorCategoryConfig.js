const VENDOR_CATEGORIES = [
  "tiffin",
  "laundry",
  "pg_hostel",
  "movers",
  "wifi",
  "bike_rental",
];

const CATEGORY_DETAIL_FIELDS = {
  tiffin: ["mealType", "pricing", "mealTimings", "deliveryAreas"],
  laundry: ["pickupDrop", "pricePerKg", "turnaroundTime", "laundryServices"],
  pg_hostel: ["rentRange", "occupancy", "furnished", "sharingType"],
  movers: ["vehicleType", "startingPrice", "helpersAvailable", "cityCoverage"],
  wifi: ["planSpeed", "monthlyPrice", "installationTime", "serviceAreas"],
  bike_rental: [
    "vehicleOptions",
    "pricingModel",
    "documentsNeeded",
    "availabilityAreas",
  ],
};

const getCategoryDetailFields = (category) =>
  CATEGORY_DETAIL_FIELDS[category] || [];

module.exports = {
  VENDOR_CATEGORIES,
  CATEGORY_DETAIL_FIELDS,
  getCategoryDetailFields,
};
