import { Bike, Home, Shirt, Truck, Utensils, Wifi } from "lucide-react";

export const vendorSteps = [
  "Welcome",
  "Verify",
  "Category",
  "Business",
  "Details",
  "Photos",
  "Preview",
  "Live",
];

export const vendorCategories = [
  {
    id: "tiffin",
    name: "Tiffin Service",
    shortName: "Tiffin",
    icon: Utensils,
    description: "Daily meals, home food, mess plans",
    accent: "from-amber-300/20 to-rose-400/10",
  },
  {
    id: "laundry",
    name: "Laundry",
    shortName: "Laundry",
    icon: Shirt,
    description: "Pickup, wash, iron, express returns",
    accent: "from-cyan-300/20 to-indigo-400/10",
  },
  {
    id: "pg_hostel",
    name: "PG/Hostel",
    shortName: "PG",
    icon: Home,
    description: "Student stays, sharing rooms, meals",
    accent: "from-violet-300/20 to-fuchsia-400/10",
  },
  {
    id: "movers",
    name: "Movers",
    shortName: "Movers",
    icon: Truck,
    description: "Luggage shifting and local moves",
    accent: "from-emerald-300/20 to-cyan-400/10",
  },
  {
    id: "wifi",
    name: "WiFi",
    shortName: "WiFi",
    icon: Wifi,
    description: "Broadband plans and installation",
    accent: "from-blue-300/20 to-violet-400/10",
  },
  {
    id: "bike_rental",
    name: "Bike Rental",
    shortName: "Bike",
    icon: Bike,
    description: "Hourly, daily, and monthly rentals",
    accent: "from-lime-300/20 to-indigo-400/10",
  },
];

export const initialBusinessInfo = {
  businessName: "",
  ownerName: "",
  phone: "",
  whatsapp: "",
  city: "",
  area: "",
  description: "",
};

export const categoryDetailDefaults = {
  tiffin: {
    mealType: "Veg only",
    pricing: "",
    mealTimings: "",
    deliveryAreas: "",
  },
  laundry: {
    pickupDrop: "Both pickup and drop",
    pricePerKg: "",
    turnaroundTime: "",
    laundryServices: "",
  },
  pg_hostel: {
    rentRange: "",
    occupancy: "Co-ed",
    furnished: "Fully furnished",
    sharingType: "Single and sharing",
  },
  movers: {
    vehicleType: "Mini truck",
    startingPrice: "",
    cityCoverage: "",
    helpersAvailable: "Helpers available",
  },
  wifi: {
    planSpeed: "",
    monthlyPrice: "",
    installationTime: "",
    serviceAreas: "",
  },
  bike_rental: {
    vehicleOptions: "",
    pricingModel: "",
    documentsNeeded: "",
    availabilityAreas: "",
  },
};

export const getCategoryDefaultDetails = (categoryId) => {
  const defaults = categoryDetailDefaults[categoryId] || {};
  return { ...defaults };
};
