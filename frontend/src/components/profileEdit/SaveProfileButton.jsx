import { Check, LoaderCircle, RotateCcw, Save } from "lucide-react";
import { motion } from "framer-motion";
import { formatSavedAt } from "./utils";
import { ghostButtonClass, primaryButtonClass } from "./styles";
import saveChangesEditProfile from "../../api/EditProfile/saveChangesEditProfile";

const SaveProfileButton = ({
  hasChanges,
  saveState,
  lastSavedAt,
  onReset,
  saveDisabled = false,
}) => {
  const isSaving = saveState === "saving";
  const isSaved = saveState === "saved";

  const PrimaryIcon = isSaving ? LoaderCircle : isSaved ? Check : Save;
  const primaryLabel = isSaving
    ? "Saving..."
    : saveDisabled
      ? "Fix budget range"
      : isSaved
        ? "Saved"
        : "Save changes";

  const statusLine = isSaving
    ? "Saving your draft locally..."
    : saveDisabled
      ? "Resolve the budget range above before saving."
      : lastSavedAt
        ? `Last saved ${formatSavedAt(lastSavedAt)}`
        : "The current draft stays organized until you save it.";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/92 px-4 py-4 backdrop-blur-xl sm:static sm:mt-8 sm:rounded-[1.65rem] sm:border sm:bg-slate-900/72 sm:px-6 sm:py-5">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span
            className={`mt-1 h-2.5 w-2.5 rounded-full ${
              hasChanges
                ? "bg-amber-300 shadow-[0_0_18px_rgba(251,191,36,0.5)]"
                : "bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.4)]"
            }`}
          />

          <div>
            <p className="text-sm font-semibold text-white">
              {hasChanges ? "Unsaved changes" : "Draft saved"}
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              {statusLine}
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:flex sm:items-center">
          <button
            type="button"
            onClick={onReset}
            disabled={!hasChanges || isSaving}
            className={`${ghostButtonClass} ${
              !hasChanges || isSaving ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <RotateCcw className="h-4 w-4" />
            Reset draft
          </button>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.99 }}
            disabled={!hasChanges || isSaving || saveDisabled}
            className={`${primaryButtonClass} ${
              !hasChanges || isSaving || saveDisabled
                ? "cursor-not-allowed opacity-70"
                : ""
            }`}
          >
            <PrimaryIcon
              className={`h-4 w-4 ${isSaving ? "animate-spin" : ""}`}
            />
            {primaryLabel}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SaveProfileButton;
