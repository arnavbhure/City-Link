import { House } from "lucide-react";
import { amenityOptions } from "./constants/postListingConstants";

const AmenitiesAndFit = ({ formData, handleChange }) => {
  return (
    <>
      <section className="rounded-[1.45rem] border border-white/10 bg-white/5 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
            <House className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              Amenities and fit
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Show what kind of setup students can actually expect.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-4 sm:col-span-2">
            <input
              type="checkbox"
              name="furnished"
              checked={formData.furnished}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-900"
            />
            <span className="text-sm leading-6 text-slate-300">
              Furnished setup
            </span>
          </label>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {amenityOptions.map((option) => (
            <label
              key={option.name}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-4"
            >
              <input
                type="checkbox"
                name={option.name}
                checked={formData[option.name]}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-900"
              />
              <span className="text-sm leading-6 text-slate-300">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </section>
    </>
  );
};

export default AmenitiesAndFit;
