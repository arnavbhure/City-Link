import { motion } from "framer-motion";

const MotionButton = motion.button;

const VendorCategoryCard = ({ category, selected, onSelect }) => {
  const Icon = category.icon;

  return (
    <MotionButton
      type="button"
      onClick={onSelect}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      className={`group rounded-[1.35rem] border p-5 text-left transition-colors duration-300 ${
        selected
          ? "border-indigo-300/50 bg-indigo-400/10 shadow-2xl shadow-indigo-950/40"
          : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]"
      }`}
    >
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${category.accent}`}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{category.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {category.description}
          </p>
        </div>
        <span
          className={`mt-1 h-3 w-3 rounded-full border transition ${
            selected
              ? "border-indigo-200 bg-indigo-300"
              : "border-white/20 bg-transparent group-hover:border-white/40"
          }`}
        />
      </div>
    </MotionButton>
  );
};

export default VendorCategoryCard;
