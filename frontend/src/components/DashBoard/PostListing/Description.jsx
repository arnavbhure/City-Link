import { MessagesSquare } from "lucide-react";
import { inputClassName } from "./constants/postListingConstants";

const Description = ({ formData, handleChange }) => {
  return (
    <>
      <section className="rounded-[1.45rem] border border-white/10 bg-white/5 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
            <MessagesSquare className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Description</h3>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              Add the context students need before they message you.
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              About the listing
            </span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
              placeholder="Mention commute, furnishing, vibe of the place, and anything that makes the stay smoother for students."
              className={`${inputClassName} min-h-36 resize-y`}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              House rules or expectations
            </span>
            <textarea
              name="houseRules"
              value={formData.houseRules}
              onChange={handleChange}
              rows={4}
              placeholder="Ex: Quiet after 11 PM, no indoor smoking, shared cleaning rota..."
              className={`${inputClassName} min-h-28 resize-y`}
            />
          </label>
        </div>
      </section>
    </>
  );
};

export default Description;
