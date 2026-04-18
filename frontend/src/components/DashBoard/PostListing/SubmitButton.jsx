import { ArrowRight } from "lucide-react";
import { SyncLoader } from "react-spinners";

const SubmitButton = ({ submitState, isSubmitting, submitMessage }) => {
  return (
    <>
      {submitState === "success" ? (
        <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {submitMessage}
        </div>
      ) : null}

      {submitState === "error" ? (
        <div className="mt-6 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
          {submitMessage}
        </div>
      ) : null}

      {isSubmitting ? (
        <center>
          <SyncLoader color="#724cf5" size={11} />
        </center>
      ) : (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Publishing..." : "Publish listing"}
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              setFormData(initialForm);
              setSubmitState("idle");
              setSubmitMessage("");
            }}
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
          >
            Reset form
          </button>
        </div>
      )}
    </>
  );
};

export default SubmitButton;
