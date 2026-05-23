import { motion } from "framer-motion";
import { createElement } from "react";

const MotionDiv = motion.div;

const VendorAuthCard = ({ children, footer, isVerified = false }) => {
  return (
    <div className="grid min-w-0 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <div className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:rounded-[1.75rem] sm:p-6">
        {children}

        {footer ? (
          <div className="mt-6 border-t border-white/10 pt-5 sm:mt-8 sm:pt-6">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VendorAuthCard;
