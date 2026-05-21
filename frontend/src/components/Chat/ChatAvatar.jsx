const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const ChatAvatar = ({
  name,
  color = "from-indigo-400 to-cyan-300",
  size = "md",
}) => {
  const sizes = {
    sm: "h-9 w-9 text-xs",
    md: "h-11 w-11 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${color} ${sizes[size]} font-bold text-slate-950 shadow-lg shadow-black/20`}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
};

export default ChatAvatar;
