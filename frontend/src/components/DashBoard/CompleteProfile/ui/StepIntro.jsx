const StepIntro = ({ eyebrow, title, description }) => {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-[2.2rem]">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
        {description}
      </p>
    </div>
  );
};

export default StepIntro;
