import { Check } from "lucide-react";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

const VendorStepIndicator = ({ currentStep, steps }) => {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
        <span>
          Step {currentStep} of {steps.length}
        </span>
        <span className="font-medium text-indigo-200">{steps[currentStep - 1]}</span>
      </div>

      <div className="relative h-1.5 overflow-hidden rounded-full bg-white/10">
        <MotionDiv
          className="h-full rounded-full bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 transition-all duration-500"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      </div>

      <div className="mt-4 hidden grid-cols-7 gap-2 md:grid">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isComplete = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={step} className="min-w-0">
              <div
                className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition ${
                  isComplete
                    ? "border-indigo-300/40 bg-indigo-400/20 text-indigo-100"
                    : isActive
                      ? "border-white/30 bg-white/10 text-white"
                      : "border-white/10 bg-slate-950/60 text-slate-500"
                }`}
              >
                {isComplete ? <Check className="h-4 w-4" /> : stepNumber}
              </div>
              <p
                className={`truncate text-xs ${
                  isActive ? "text-slate-200" : "text-slate-500"
                }`}
              >
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VendorStepIndicator;
