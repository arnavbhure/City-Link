import {
  ArrowLeft,
  CircleUserRound,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { chipClass, ghostButtonClass, heroShell } from "./styles";
import { formatSavedAt } from "./utils";

const EditProfileHeader = ({
  fullName,
  email,
  isDirty,
  saveState,
  lastSavedAt,
  sections,
}) => {
  const statusText = isDirty
    ? "Unsaved changes"
    : saveState === "saved"
      ? "Draft saved"
      : "Ready to edit";

  const statusDetail = lastSavedAt
    ? `Last saved ${formatSavedAt(lastSavedAt)}`
    : "Fields update live as you edit the draft.";

  return (
    <div className={`${heroShell} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(103,232,249,0.14),transparent_42%),radial-gradient(circle_at_top_right,rgba(129,140,248,0.10),transparent_35%)]" />

      <div className="relative p-6 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className={chipClass}>
                <Sparkles className="h-4 w-4" />
                Edit profile
              </span>
              <span className={chipClass}>
                <LockKeyhole className="h-4 w-4" />
                Identity stays locked
              </span>
            </div>

            <h1
              className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Shape a profile that feels like you in real life.
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              Update your academic details, roommate filters, and everyday
              preferences without turning the page into a boring form.
            </p>

            <nav
              className="mt-7 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Profile edit sections"
            >
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={chipClass}
                >
                  {section.label}
                </a>
              ))}
            </nav>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/dashboard" className={ghostButtonClass}>
                <ArrowLeft className="h-4 w-4" />
                Back to dashboard
              </Link>

              <div className="text-sm text-slate-400">
                <p className="font-medium text-white">{statusText}</p>
                <p className="mt-1">{statusDetail}</p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[24rem] shrink-0">
            <div className="rounded-[1.65rem] border border-white/10 bg-slate-950/55 p-5 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.9)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-cyan-300 via-sky-300 to-indigo-400 text-slate-950">
                  <CircleUserRound className="h-6 w-6" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {fullName || "CityLink student"}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {email || "Account email will appear here"}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-500">
                    Draft mode
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {isDirty
                      ? "You have unsaved changes"
                      : "Everything is synced to the current draft"}
                  </p>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-500">
                    Profile sections
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {sections.length} focused areas with a cleaner rhythm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileHeader;
