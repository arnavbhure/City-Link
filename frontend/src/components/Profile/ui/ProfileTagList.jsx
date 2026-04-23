const ProfileTagList = ({
  items,
  tone = "default",
  emptyLabel = "No items added yet.",
}) => {
  const toneClass =
    tone === "accent"
      ? "border-indigo-400/20 bg-indigo-500/10 text-indigo-100"
      : "border-white/10 bg-slate-950/60 text-slate-200";

  if (!items?.length) {
    return <p className="text-sm text-slate-400">{emptyLabel}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded-full border px-3.5 py-2 text-sm font-medium ${toneClass}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default ProfileTagList;

