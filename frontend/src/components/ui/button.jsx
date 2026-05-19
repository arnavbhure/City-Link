import { cn } from "../../lib/utils";

const variants = {
  default:
    "bg-white text-slate-950 shadow-lg shadow-black/20 hover:bg-slate-200",
  secondary:
    "border border-white/10 bg-white/[0.06] text-white hover:border-white/20 hover:bg-white/[0.1]",
  ghost: "text-slate-300 hover:bg-white/[0.06] hover:text-white",
};

const sizes = {
  default: "h-12 px-6 text-sm",
  lg: "h-14 px-7 text-base",
  icon: "h-11 w-11 ",
};

export function Button({
  as: Component = "button",
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}) {
  return (
    <Component
      type={Component === "button" ? type : undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70 active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
