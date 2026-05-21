import { createElement } from "react";

const StatCard = ({ icon, label, value, detail, tone }) => {
  return (
    <div className="group rounded-[1.2rem] border border-white/10 bg-white/[0.045] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.065]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {label}
          </p>
          <p className="mt-3 text-2xl font-black tracking-tight text-white">
            {value}
          </p>
        </div>
        <span
          className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/70 ${tone}`}
        >
          {createElement(icon, { className: "h-5 w-5" })}
        </span>
      </div>
      <p className="mt-4 min-h-10 text-sm leading-5 text-slate-400">
        {detail}
      </p>
    </div>
  );
};

export default StatCard;
