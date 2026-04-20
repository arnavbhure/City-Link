import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

function getErrorText(error) {
  if (typeof error === "string") {
    return error.trim();
  }

  if (error instanceof Error) {
    return error.message.trim();
  }

  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message.trim();
  }

  return "";
}

const ErrorMessage = ({
  error,
  message,
  title = "Something went wrong",
  description = "We hit a problem while loading this page. Please go back or return home.",
  fullPage = false,
  embedded = false,
}) => {
  const errorText = getErrorText(error ?? message);

  if (!errorText) {
    return null;
  }

  if (!fullPage) {
    return (
      <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
        {errorText}
      </div>
    );
  }

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.assign("/");
  };

  return (
    <section
      className={`relative overflow-hidden bg-slate-950 px-6 text-white sm:px-8 lg:px-10 ${
        embedded
          ? "pb-16 pt-32 lg:pb-20 lg:pt-40"
          : "min-h-screen pb-20 pt-32 lg:pt-40"
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute left-[10%] top-32 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[10%] top-28 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-200">
            <AlertTriangle className="h-4 w-4" />
            Error
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
            {title}
          </h1>

          <p className="mt-4 text-base leading-8 text-slate-300">
            {description}
          </p>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300">
              Error details
            </p>
            <p className="mt-3 text-base leading-7 text-slate-200">
              {errorText}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Back to home
              <Home className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={handleGoBack}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Go back
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorMessage;
