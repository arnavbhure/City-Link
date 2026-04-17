import { Wallet } from "lucide-react";
import { inputClassName } from "./constants/postListingConstants";

const PricingAndTiming = ({ handleChange, formData }) => {
  return (
    <>
      <section className="rounded-[1.45rem] border border-white/10 bg-white/5 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              Pricing and timing
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Students compare rent clarity and move-in readiness very quickly.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Monthly rent
            </span>
            <input
              type="number"
              min="0"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              placeholder="Ex: 13500"
              required
              className={inputClassName}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Deposit amount
            </span>
            <input
              type="number"
              min="0"
              name="deposit"
              value={formData.deposit}
              onChange={handleChange}
              placeholder="Ex: 15000"
              required
              className={inputClassName}
            />
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Available from
            </span>
            <select
              name="availableFrom"
              value={formData.availableFrom}
              onChange={handleChange}
              className={inputClassName}
            >
              <option>Immediate</option>
              <option>This month</option>
              <option>Next month</option>
            </select>
          </label>
        </div>
      </section>
    </>
  );
};
export default PricingAndTiming;
