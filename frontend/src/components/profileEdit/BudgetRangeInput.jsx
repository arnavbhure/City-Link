import { buildBudgetSummary, hasValue } from "./utils";
import {
  fieldInputClass,
  fieldShellClass,
  helperClass,
  labelClass,
  cardShell,
} from "./styles";

const BudgetRangeInput = ({
  minimumValue,
  maximumValue,
  onMinimumChange,
  onMaximumChange,
  error,
}) => {
  const hasMinimum = hasValue(minimumValue);
  const hasMaximum = hasValue(maximumValue);
  const visualWidth =
    hasMinimum && hasMaximum
      ? "100%"
      : hasMinimum || hasMaximum
        ? "64%"
        : "28%";
  const summary = buildBudgetSummary(minimumValue, maximumValue);

  return (
    <div className={`${cardShell} px-4 py-4`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={labelClass}>Budget range</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Set a monthly range that feels honest, flexible, and still leaves
            room for a good roommate fit.
          </p>
        </div>

        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-cyan-200">
          {summary}
        </span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Minimum</span>
          <div className={`${fieldShellClass} mt-3`}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-500">₹</span>
              <input
                type="number"
                min="0"
                inputMode="numeric"
                value={minimumValue}
                onChange={(event) => onMinimumChange(event.target.value)}
                placeholder="8000"
                className={`${fieldInputClass} mt-0`}
              />
            </div>
          </div>
        </label>

        <label className="block">
          <span className={labelClass}>Maximum</span>
          <div className={`${fieldShellClass} mt-3`}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-500">₹</span>
              <input
                type="number"
                min="0"
                inputMode="numeric"
                value={maximumValue}
                onChange={(event) => onMaximumChange(event.target.value)}
                placeholder="15000"
                className={`${fieldInputClass} mt-0`}
              />
            </div>
          </div>
        </label>
      </div>

      <div className="mt-5 rounded-[1.2rem] border border-white/10 bg-slate-950/40 px-4 py-4">
        <div className="flex items-center justify-between gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
          <span>Monthly comfort zone</span>
          <span>{summary}</span>
        </div>

        <div className="mt-3 h-2 rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 transition-all duration-300"
            style={{ width: visualWidth }}
          />
        </div>
      </div>

      {error ? (
        <p className="mt-3 text-sm leading-6 text-amber-200">{error}</p>
      ) : null}

      <p className={helperClass}>
        Choose a range that feels realistic enough to filter well, but broad
        enough to avoid missing good options.
      </p>
    </div>
  );
};

export default BudgetRangeInput;
