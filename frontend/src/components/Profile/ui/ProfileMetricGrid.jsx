const toneClasses = {
  indigo:
    "border-indigo-400/20 bg-indigo-500/10 text-indigo-100 shadow-[0_18px_45px_-30px_rgba(99,102,241,0.85)]",
  emerald:
    "border-emerald-400/20 bg-emerald-500/10 text-emerald-100 shadow-[0_18px_45px_-30px_rgba(16,185,129,0.8)]",
  amber:
    "border-amber-400/20 bg-amber-500/10 text-amber-100 shadow-[0_18px_45px_-30px_rgba(245,158,11,0.8)]",
  slate:
    "border-white/10 bg-white/5 text-slate-100 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.75)]",
};

const ProfileMetricGrid = ({ metrics }) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(({ label, value, hint, icon: Icon, tone = "slate" }) => (
        <article
          key={label}
          className={`rounded-[1.35rem] border p-4 sm:p-5 ${toneClasses[tone] ?? toneClasses.slate}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-current/70">
                {label}
              </p>
              <p className="mt-3 text-2xl font-bold text-white sm:text-[1.75rem]">
                {value}
              </p>
            </div>
            {Icon ? (
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-2.5 text-white/90">
                <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
              </div>
            ) : null}
          </div>
          {hint ? (
            <p className="mt-3 text-sm leading-6 text-current/80">{hint}</p>
          ) : null}
        </article>
      ))}
    </div>
  );
};

export default ProfileMetricGrid;

