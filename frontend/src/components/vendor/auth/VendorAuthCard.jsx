import { motion } from "framer-motion";
import { CheckCircle2, Clock3, LockKeyhole, ShieldCheck } from "lucide-react";
import { createElement } from "react";

const MotionDiv = motion.div;

const trustItems = [
  {
    icon: LockKeyhole,
    label: "No password needed",
  },
  {
    icon: ShieldCheck,
    label: "Verified contact",
  },
  {
    icon: Clock3,
    label: "Takes under a minute",
  },
];

const VendorAuthCard = ({ children, footer, isVerified = false }) => {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-6">
        {children}
        {footer ? (
          <div className="mt-8 border-t border-white/10 pt-6">{footer}</div>
        ) : null}
      </div>

      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6">
        <div className="absolute right-8 top-8 h-32 w-32 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute bottom-8 left-8 h-36 w-36 rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="relative">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">
                Trust layer
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                A cleaner start for local vendors.
              </h2>
            </div>
            <MotionDiv
              animate={isVerified ? { scale: [1, 1.08, 1] } : { scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-400/10 text-emerald-100 sm:flex"
            >
              <CheckCircle2 className="h-6 w-6" />
            </MotionDiv>
          </div>

          <div className="space-y-3">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] text-indigo-200">
                  {createElement(item.icon, { className: "h-4 w-4" })}
                </span>
                <span className="text-sm font-medium text-slate-300">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-emerald-300/15 bg-emerald-400/10 p-4">
            <p className="text-sm leading-6 text-emerald-50/90">
              Students prefer messaging vendors directly. Verifying WhatsApp
              helps CityLink route inquiries to the number you actually use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorAuthCard;
