const OptionPill = ({ label, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-3 text-sm font-medium transition sm:px-5 ${
        selected
          ? "border-cyan-300/60 bg-cyan-400/15 text-white shadow-[0_16px_45px_-24px_rgba(56,189,248,0.85)]"
          : "border-white/10 bg-white/3 text-slate-300 hover:border-white/20 hover:bg-white/6 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
};

export default OptionPill;
