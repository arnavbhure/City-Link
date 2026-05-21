import { Check, Circle } from "lucide-react";
import SectionCard from "./SectionCard";
import { getReadinessItems } from "./dashboardData";

const ReadinessChecklist = ({ user }) => {
  const readinessItems = getReadinessItems(user);
  const completedCount = readinessItems.filter((item) => item.done).length;

  return (
    <SectionCard
      eyebrow="Readiness"
      title="Profile health"
      description={`${completedCount} of ${readinessItems.length} setup signals are complete.`}
    >
      <div className="space-y-3">
        {readinessItems.map((item) => (
          <div
            key={item.label}
            className="flex gap-3 rounded-[1.1rem] border border-white/10 bg-slate-950/45 p-4"
          >
            <span
              className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                item.done
                  ? "bg-emerald-300 text-slate-950"
                  : "border border-white/15 text-slate-500"
              }`}
            >
              {item.done ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Circle className="h-3.5 w-3.5" />
              )}
            </span>
            <div>
              <p className="text-sm font-bold text-white">{item.label}</p>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default ReadinessChecklist;
