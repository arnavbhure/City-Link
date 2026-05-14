const SectionDivider = ({ label }) => {
  return (
    <div className="my-6 flex items-center gap-4">
      <span className="h-px flex-1 bg-white/10" />
      {label ? (
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
          {label}
        </span>
      ) : (
        <span className="h-2 w-2 rounded-full bg-white/20" />
      )}
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
};

export default SectionDivider;
