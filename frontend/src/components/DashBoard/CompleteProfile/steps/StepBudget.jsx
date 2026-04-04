import { MapPin, Wallet } from "lucide-react";
import StepIntro from "../ui/StepIntro";
import {
  cardClassName,
  formatBudgetValue,
  inputClassName,
} from "../utils/completeProfileUtils";

const StepBudget = ({
  preferences,
  currentStepErrors,
  onBudgetChange,
  onPreferenceChange,
}) => {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-6">
        <StepIntro
          eyebrow="Step 1"
          title="Start with your rent range"
          description="A clear budget and target city help CityLink surface roommate matches that fit your day-to-day life."
        />

        <div className={`${cardClassName} space-y-5`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-white">
                Budget minimum
              </span>
              <input
                type="number"
                min="0"
                placeholder="800"
                value={preferences.budget_min}
                onChange={(event) =>
                  onBudgetChange("budget_min", event.target.value)
                }
                className={inputClassName}
              />
              {preferences.budget_min !== "" && currentStepErrors.budget_min ? (
                <p className="mt-2 text-sm text-rose-300">
                  {currentStepErrors.budget_min}
                </p>
              ) : null}
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-white">
                Budget maximum
              </span>
              <input
                type="number"
                min="0"
                placeholder="1500"
                value={preferences.budget_max}
                onChange={(event) =>
                  onBudgetChange("budget_max", event.target.value)
                }
                className={inputClassName}
              />
              {preferences.budget_max !== "" && currentStepErrors.budget_max ? (
                <p className="mt-2 text-sm text-rose-300">
                  {currentStepErrors.budget_max}
                </p>
              ) : null}
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-white">
              Preferred city
            </span>
            <input
              type="text"
              placeholder="Bengaluru, Boston, or anywhere nearby"
              value={preferences.preferred_city}
              onChange={(event) =>
                onPreferenceChange("preferred_city", event.target.value)
              }
              className={inputClassName}
            />
          </label>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm font-semibold text-white">Matching tip</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Students with a realistic budget range usually get stronger
              roommate matches and cleaner housing recommendations.
            </p>
          </div>
        </div>
      </div>

      <aside className={`${cardClassName} space-y-6`}>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-cyan-200">
          <Wallet className="h-4 w-4" />
          Quick preview
        </div>

        <div className="rounded-[1.6rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-400/10 via-slate-950/60 to-sky-400/10 p-5">
          <p className="text-sm font-medium text-slate-300">Monthly budget</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-white">
            {formatBudgetValue(preferences.budget_min)}
            <span className="mx-2 text-slate-500">-</span>
            {formatBudgetValue(preferences.budget_max)}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Keep this broad enough to see more housing options, but narrow
            enough to reflect your real comfort zone.
          </p>
        </div>

        <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex rounded-2xl border border-white/10 bg-white/[0.04] p-2 text-cyan-300">
              <MapPin className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Location target</p>
              <p className="mt-1 text-sm text-slate-400">
                {preferences.preferred_city || "No city selected yet"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default StepBudget;
