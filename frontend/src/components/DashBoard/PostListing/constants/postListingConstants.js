import {
  BadgeCheck,
  House,
  MessagesSquare,
  ShieldCheck,
  Wifi,
} from "lucide-react";

export const propertyTypeOptions = [
  { value: "flat", label: "Flat" },
  { value: "room", label: "Room" },
  { value: "pg", label: "PG" },
];

export const sharingTypeOptions = [
  "Private room",
  "Twin-sharing",
  "Triple-sharing",
  "Entire place",
];

export const amenityOptions = [
  { name: "wifi", label: "Wi-Fi included" },
  { name: "meals", label: "Meals available" },
  { name: "attachedWashroom", label: "Attached washroom" },
  { name: "laundry", label: "Laundry support" },
  { name: "powerBackup", label: "Power backup" },
];

export const initialForm = {
  title: "",
  propertyType: "flat",
  city: "",
  locality: "",
  rent: "",
  deposit: "",
  availableFrom: "Immediate",
  sharingType: "Twin-sharing",
  description: "",
  houseRules: "",
  furnished: true,
  wifi: true,
  meals: false,
  attachedWashroom: false,
  laundry: false,
  powerBackup: false,
};

export const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/50 focus:bg-slate-950";
