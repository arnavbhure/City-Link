const OptionGroup = ({ title, description, children }) => {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
      </div>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
};

export default OptionGroup;
