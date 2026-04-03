import { Building2, Clock3, Sparkles, Wifi } from "lucide-react";
import { Link } from "react-router-dom";

const HeroHouseListing = () => {
  return (
    <section className="grid gap-5 rounded-[1.6rem] border border-white/10 bg-slate-900/70 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300">
          <Sparkles className="h-4 w-4" />
          Student housing explorer
        </div>

        <h1 className="mt-5 text-[2.15rem] font-black leading-none tracking-tight text-white sm:mt-6 sm:text-5xl">
          Browse places that feel
          <span className="block bg-linear-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            easier to move into.
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Compare PGs, shared flats, studios, and student-ready rooms with
          clearer rent bands, commute signals, and setup details.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Back to dashboard
          </Link>
        </div>
      </div>

      <div className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-400/10 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
          Student checklist
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          What students ask before booking
        </h2>

        <div className="mt-6 space-y-4">
          <div className="rounded-[1.3rem] border border-white/10 bg-slate-950/55 p-4">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-indigo-300" />
              <span className="font-semibold text-white">
                Move-in readiness
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Check how quickly you can move in and whether furniture,
              utilities, and deposits are already clearly explained.
            </p>
          </div>

          <div className="rounded-[1.3rem] border border-white/10 bg-slate-950/55 p-4">
            <div className="flex items-center gap-3">
              <Wifi className="h-5 w-5 text-cyan-300" />
              <span className="font-semibold text-white">
                Everyday essentials
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Reliable Wi-Fi, laundry access, and commute practicality often
              matter more than cosmetic extras.
            </p>
          </div>

          <div className="rounded-[1.3rem] border border-white/10 bg-slate-950/55 p-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-emerald-300" />
              <span className="font-semibold text-white">Building safety</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Ask about gated entry, neighborhood feel, and who manages
              maintenance before you commit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHouseListing;
