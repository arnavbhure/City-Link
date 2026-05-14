import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { cardShell, labelClass } from "./styles";
import { humanizeValue } from "./utils";

const columnsClassMap = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

const LifestyleSelector = ({
  title,
  description,
  options,
  value,
  onChange,
  columns = 3,
  compact = false,
}) => {
  const currentOption = options.find((option) => option.value === value);
  const currentLabel =
    currentOption?.label || humanizeValue(value, "Choose one");

  return (
    <div className={`${cardShell} px-4 py-4`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={labelClass}>{title}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
        </div>

        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-cyan-200">
          {currentLabel}
        </span>
      </div>

      {compact ? (
        <div className="mt-4 flex flex-wrap gap-3">
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <motion.button
                key={option.value}
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => onChange(option.value)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition duration-200 ${
                  selected
                    ? "border-cyan-300/40 bg-cyan-400/12 text-white shadow-[0_16px_45px_-30px_rgba(56,189,248,0.75)]"
                    : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <span
                  className={`inline-flex h-2.5 w-2.5 rounded-full transition ${
                    selected ? "bg-cyan-200" : "bg-white/25"
                  }`}
                />
                {option.label}
                {selected ? <Check className="h-4 w-4 text-cyan-200" /> : null}
              </motion.button>
            );
          })}
        </div>
      ) : (
        <div
          className={`mt-4 grid gap-3 ${columnsClassMap[columns] ?? "sm:grid-cols-3"}`}
        >
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <motion.button
                key={option.value}
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => onChange(option.value)}
                className={`group flex h-full flex-col items-start rounded-[1.2rem] border px-4 py-4 text-left transition duration-200 ${
                  selected
                    ? "border-cyan-300/40 bg-cyan-400/10 shadow-[0_18px_50px_-35px_rgba(56,189,248,0.75)]"
                    : "border-white/10 bg-slate-950/35 hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex w-full items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {option.label}
                    </p>
                    {option.description ? (
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {option.description}
                      </p>
                    ) : null}
                  </div>

                  <span
                    className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
                      selected
                        ? "border-cyan-200/60 bg-cyan-200 text-slate-950"
                        : "border-white/10 bg-white/[0.04] text-transparent group-hover:border-cyan-300/40 group-hover:text-cyan-200"
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LifestyleSelector;
