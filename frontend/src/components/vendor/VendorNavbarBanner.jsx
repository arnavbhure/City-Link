import { BadgeCheck, Clock3, MessageCircle, Sparkles } from "lucide-react";

const miniRows = [
  ["Student inquiries", "Nearby"],
  ["Verification", "Light review"],
  ["Setup time", "Under 4 min"],
];

const VendorNavbarBanner = () => {
  return (
    <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="flex flex-col justify-between gap-8">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-400/10 px-3 py-1.5 text-sm font-medium text-indigo-200">
            <Sparkles className="h-4 w-4" />
            CityLink Partner Listing
          </div>
          <h2 className="max-w-md text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Reach students right when they are settling into a new city.
          </h2>
          <p className="mt-4 max-w-lg leading-7 text-slate-400">
            Keep your listing simple: what you offer, where you serve, and how
            students can reach you on WhatsApp.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {miniRows.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3"
            >
              <span className="text-sm text-slate-400">{label}</span>
              <span className="text-sm font-semibold text-white">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative min-h-72 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-5">
        <div className="absolute inset-x-8 top-12 h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />
        <div className="absolute bottom-8 left-8 right-10 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
        <div className="absolute left-14 top-10 h-36 w-px bg-gradient-to-b from-transparent via-violet-300/30 to-transparent" />
        <div className="absolute right-16 top-20 h-36 w-px bg-gradient-to-b from-transparent via-indigo-300/30 to-transparent" />

        <div className="relative ml-auto w-full max-w-sm rounded-[1.35rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/20">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-200">
                Live card
              </p>
              <p className="mt-1 text-lg font-semibold text-white">
                Sharma Tiffin House
              </p>
            </div>
            <BadgeCheck className="h-5 w-5 text-cyan-200" />
          </div>
          <div className="h-28 rounded-2xl bg-gradient-to-br from-indigo-300/20 via-violet-300/10 to-cyan-300/20" />
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              Tiffin
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              Near Hinjewadi
            </span>
          </div>
        </div>

        <div className="relative mt-4 grid max-w-sm gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
            <Clock3 className="mb-3 h-5 w-5 text-indigo-200" />
            <p className="text-sm font-medium text-white">Quick review</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              We check details before students see it.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
            <MessageCircle className="mb-3 h-5 w-5 text-cyan-200" />
            <p className="text-sm font-medium text-white">WhatsApp ready</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Inquiries go where vendors already reply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorNavbarBanner;
