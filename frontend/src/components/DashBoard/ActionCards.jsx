import { createElement } from "react";
import { ArrowRight, Building2, Search, Users } from "lucide-react";

const primaryActions = [
  {
    icon: Users,
    title: "Find roommates",
    description:
      "See students with similar budgets, routines, and move timelines.",
    cta: "Explore matches",
    accent: "bg-gradient-to-br from-indigo-500/18 via-white/5 to-cyan-400/10",
  },
  {
    icon: Search,
    title: "Browse housing",
    description: "Open PGs, rooms, and flats that match your city and budget.",
    cta: "See housing",
    accent: "bg-gradient-to-br from-slate-900/80 via-white/5 to-indigo-500/10",
  },
  {
    icon: Building2,
    title: "Post a listing",
    description:
      "Publish an available room or flat and start getting responses fast.",
    cta: "Create listing",
    accent: "bg-gradient-to-br from-slate-900/80 via-white/5 to-fuchsia-500/10",
  },
];

const ActionCard = ({ icon: Icon, title, description, cta, accent }) => {
  return (
    <button
      className={`group flex min-h-[190px] flex-col rounded-[1.55rem] border border-white/10 ${accent} p-5 text-left backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-white/20 sm:min-h-[220px] sm:rounded-[1.8rem] sm:p-7`}
    >
      <div className="inline-flex w-fit rounded-[1rem] border border-white/10 bg-slate-950/70 p-2.5 text-indigo-300 sm:rounded-2xl sm:p-3">
        {createElement(Icon, { className: "h-4.5 w-4.5 sm:h-5 sm:w-5" })}
      </div>

      <div className="mt-7 space-y-3 sm:mt-10 sm:space-y-4">
        <h2 className="text-[1.7rem] font-bold text-white sm:text-[1.7rem]">
          {title}
        </h2>
        <p className="max-w-sm text-[0.95rem] leading-6 text-slate-300 sm:max-w-xs sm:text-base sm:leading-7">
          {description}
        </p>
      </div>

      <div className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-white sm:pt-8">
        {cta}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </button>
  );
};

const ActionCards = () => {
  return (
    <>
      <section className="rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
        <div className="mb-5 flex items-center justify-between gap-4 sm:mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
              Primary actions
            </p>
            <h2 className="mt-2 text-[2rem] font-black text-white sm:mt-3 sm:text-4xl">
              Start here
            </h2>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
          {primaryActions.map((action) => (
            <ActionCard key={action.title} {...action} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ActionCards;
