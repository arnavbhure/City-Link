import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const MotionDiv = motion.div;
const MotionSpan = motion.span;

const VendorSuccessScreen = ({ onViewListing, shareUrl }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-12"
    >
      <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
        <MotionSpan
          className="absolute h-full w-full rounded-full bg-emerald-400/10"
          animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.45, 0.08, 0.45] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="absolute h-20 w-20 rounded-full border border-emerald-300/20 bg-emerald-400/10" />
        <MotionSpan
          initial={{ scale: 0.8, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 360, damping: 22 }}
          className="relative"
        >
          <CheckCircle2 className="h-12 w-12 text-emerald-200" />
        </MotionSpan>
      </div>

      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-200">
        Listing submitted
      </p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
        Your listing is now live 🎉
      </h1>
      <p className="mx-auto mt-5 max-w-xl leading-8 text-slate-300">
        Students nearby can now discover your service and reach you directly on
        WhatsApp.
      </p>

      <a
        href={shareUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10 sm:w-auto"
      >
        <MessageCircle className="h-4 w-4" />
        Share on WhatsApp
      </a>
    </MotionDiv>
  );
};

export default VendorSuccessScreen;
