import { createElement } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionCard from "./SectionCard";
import { getQuickActions } from "./dashboardData";

const QuickActions = ({ user }) => {
  const actions = getQuickActions(user);

  return (
    <SectionCard
      eyebrow="Primary actions"
      title="Start with the next useful step"
      description="Every card links to an existing CityLink workflow."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.href}
            className="group relative min-h-[13rem] overflow-hidden rounded-[1.2rem] border border-white/10 bg-slate-950/50 p-4 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-slate-950/70"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${action.tone}`} />
            <div className="flex items-start justify-between gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.055] text-indigo-100">
                {createElement(action.icon, { className: "h-5 w-5" })}
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition group-hover:bg-indigo-300 group-hover:text-slate-950">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>

            <h3 className="mt-7 text-lg font-black text-white">
              {action.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {action.description}
            </p>
            <p className="mt-5 text-sm font-bold text-indigo-100">
              {action.cta}
            </p>
          </Link>
        ))}
      </div>
    </SectionCard>
  );
};

export default QuickActions;
