import { initialForm, inputClassName } from "./constants/postListingConstants";
import { Building2 } from "lucide-react";
import {
  propertyTypeOptions,
  sharingTypeOptions,
} from "./constants/postListingConstants";
import { useHandleFunctions } from "./hooks/handleFunctions";

const BasicDetails = ({ handleChange, formData }) => {
  return (
    <>
      <section className="rounded-[1.45rem] border border-white/10 bg-white/5 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Basics</h3>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Help students understand the type of listing and where it is
              located.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Listing title
            </span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Furnished private room near North Campus"
              required
              className={inputClassName}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Listing type
            </span>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className={inputClassName}
            >
              {propertyTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Sharing setup
            </span>
            <select
              name="sharingType"
              value={formData.sharingType}
              onChange={handleChange}
              className={inputClassName}
            >
              {sharingTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              City
            </span>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Delhi, Bengaluru, Pune..."
              required
              className={inputClassName}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Locality
            </span>
            <input
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              placeholder="Area, lane, or landmark"
              required
              className={inputClassName}
            />
          </label>
        </div>
      </section>
    </>
  );
};

export default BasicDetails;
