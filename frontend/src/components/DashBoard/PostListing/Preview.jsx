import { BadgeCheck, MapPin, CalendarDays, Wifi } from "lucide-react";
import {
  propertyTypeOptions,
  amenityOptions,
} from "./constants/postListingConstants";
import formatCurrency from "./utils/formatCurrency";
import { useSelector } from "react-redux";

const Preview = ({ formData, completedCount, completionItems }) => {
  const user = useSelector((state) => state.user);
  const previewAmenities = [
    formData.furnished ? "Fully furnished" : null,
    ...amenityOptions
      .filter((option) => formData[option.name])
      .map((option) => option.label),
  ].filter(Boolean);

  const propertyTypeLabel =
    propertyTypeOptions.find((option) => option.value === formData.propertyType)
      ?.label || "Property";
  const formattedRent = formatCurrency(formData.rent);
  const formattedDeposit = formatCurrency(formData.deposit);
  const hostName = user.full_name || "CityLink host";
  const hostCollege = user.college || "Student community member";

  const completionPercentage = (completedCount / completionItems.length) * 100;

  return (
    <>
      <section className="rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
              Live preview
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">
              How students will read it
            </h2>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            {Math.round(completionPercentage)}% ready
          </div>
        </div>

        <div className="mt-5 h-2 rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 transition-all"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <article className="mt-6 rounded-[1.45rem] border border-white/10 bg-white/5 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                <BadgeCheck className="h-3.5 w-3.5" />
                Draft listing
              </div>
              <h3 className="mt-4 text-2xl font-bold text-white">
                {formData.title || "Your listing title will appear here"}
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                {propertyTypeLabel} | {formData.sharingType}
              </p>
            </div>

            <div className="w-fit rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-indigo-200">
              {formattedRent ? `${formattedRent} / month` : "Add rent"}
            </div>
          </div>

          <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3">
              <MapPin className="h-4 w-4 text-cyan-300" />
              <span>
                {formData.locality
                  ? `${formData.locality}, ${formData.city || ""}`
                  : "Add city and locality"}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3">
              <CalendarDays className="h-4 w-4 text-indigo-300" />
              <span>{formData.availableFrom}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200">
              {formattedDeposit ? `${formattedDeposit} deposit` : "Add deposit"}
            </span>
            <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200">
              {formData.sharingType}
            </span>
            <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200">
              {formData.furnished ? "Furnished" : "Unfurnished"}
            </span>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-300">
            {formData.description.trim() ||
              "Add a clear description so students can quickly understand the space, location, and vibe before they contact you."}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {(previewAmenities.length
              ? previewAmenities
              : ["Select amenities to highlight"]
            ).map((item) => (
              <span
                key={item}
                className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-100"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-slate-950/60 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-indigo-300">
                <Wifi className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-white">{hostName}</p>
                <p className="mt-1 text-sm text-slate-400">{hostCollege}</p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default Preview;
