const ProfileCard = ({
  eyebrow,
  title,
  description,
  action,
  className = "",
  children,
}) => {
  return (
    <section
      className={`rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-7 ${className}`}
    >
      {(eyebrow || title || description || action) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-[1.9rem]">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      )}

      <div className={eyebrow || title || description || action ? "mt-6" : ""}>
        {children}
      </div>
    </section>
  );
};

export default ProfileCard;

