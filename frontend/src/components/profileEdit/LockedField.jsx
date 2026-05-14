import { Lock } from "lucide-react";
import { cardShell, helperClass, labelClass } from "./styles";

const LockedField = ({
  label,
  value,
  helper = "Identity fields cannot be changed",
}) => {
  return (
    <div className={`${cardShell} px-4 py-4`}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={labelClass}>{label}</p>
          <p className="mt-2 break-words text-base font-semibold text-white">
            {value || "Not available yet"}
          </p>
        </div>

        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-cyan-200">
          <Lock className="h-4 w-4" />
        </span>
      </div>

      <p className={helperClass}>{helper}</p>
    </div>
  );
};

export default LockedField;
