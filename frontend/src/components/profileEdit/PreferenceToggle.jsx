import { motion } from "framer-motion";
import { cardShell, helperClass } from "./styles";

const PreferenceToggle = ({
  label,
  description,
  checked,
  onChange,
  icon: Icon,
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`${cardShell} flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition duration-200 ${
        checked
          ? "border-cyan-300/35 bg-cyan-400/10"
          : "hover:border-white/20 hover:bg-white/[0.06]"
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-start gap-3">
          {Icon ? (
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-cyan-200">
              <Icon className="h-4 w-4" />
            </span>
          ) : null}

          <div>
            <p className="text-sm font-semibold text-white">{label}</p>
            <p className={helperClass}>{description}</p>
          </div>
        </div>
      </div>

      <span
        className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border transition ${
          checked
            ? "border-cyan-300/40 bg-cyan-400"
            : "border-white/10 bg-white/10"
        }`}
      >
        <motion.span
          initial={false}
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="inline-block h-6 w-6 rounded-full bg-white shadow-sm"
        />
      </span>
    </button>
  );
};

export default PreferenceToggle;
