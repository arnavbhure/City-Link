const SectionCard = ({ eyebrow, title, description, children, action }) => {
  return (
    <section className="rounded-[1.4rem] border border-white/10 bg-slate-900/[0.72] p-5 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-6">
      {(eyebrow || title || description || action) && (
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-200">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-2 text-xl font-black tracking-tight text-white sm:text-2xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                {description}
              </p>
            ) : null}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
};

export default SectionCard;
