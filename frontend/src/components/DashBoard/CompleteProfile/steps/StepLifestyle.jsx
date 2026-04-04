import { MoonStar } from "lucide-react";
import OptionGroup from "../ui/OptionGroup";
import OptionPill from "../ui/OptionPill";
import StepIntro from "../ui/StepIntro";
import {
  cardClassName,
  humanizeValue,
} from "../utils/completeProfileUtils";

const StepLifestyle = ({ lifestyle, onLifestyleChange }) => {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-6">
        <StepIntro
          eyebrow="Step 3"
          title="Describe your everyday rhythm"
          description="This helps CityLink surface roommates who match your social energy, sleep schedule, and standards around shared spaces."
        />

        <div className={`${cardClassName} space-y-6`}>
          <OptionGroup
            title="Lifestyle type"
            description="Pick the overall energy that feels most like you."
          >
            {["quiet", "social", "balanced"].map((option) => (
              <OptionPill
                key={option}
                label={humanizeValue(option)}
                selected={lifestyle.lifestyle_type === option}
                onClick={() => onLifestyleChange("lifestyle_type", option)}
              />
            ))}
          </OptionGroup>

          <OptionGroup
            title="Sleep schedule"
            description="Let future roommates know whether you tend to rise early or stay up late."
          >
            {["early_riser", "night_owl", "any"].map((option) => (
              <OptionPill
                key={option}
                label={humanizeValue(option)}
                selected={lifestyle.sleep_schedule === option}
                onClick={() => onLifestyleChange("sleep_schedule", option)}
              />
            ))}
          </OptionGroup>

          <OptionGroup
            title="Cleanliness level"
            description="How tidy do you like a shared room or apartment to stay?"
          >
            {["low", "medium", "high"].map((option) => (
              <OptionPill
                key={option}
                label={humanizeValue(option)}
                selected={lifestyle.cleanliness_level === option}
                onClick={() => onLifestyleChange("cleanliness_level", option)}
              />
            ))}
          </OptionGroup>
        </div>
      </div>

      <aside className={`${cardClassName} space-y-4`}>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-cyan-200">
          <MoonStar className="h-4 w-4" />
          Lifestyle summary
        </div>

        <div className="rounded-[1.6rem] border border-cyan-300/15 bg-gradient-to-br from-cyan-400/10 via-slate-950/70 to-sky-400/10 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Your vibe
          </p>
          <p className="mt-3 text-2xl font-black tracking-tight text-white">
            {humanizeValue(lifestyle.lifestyle_type)}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Sleep: {humanizeValue(lifestyle.sleep_schedule)}
            <br />
            Cleanliness: {humanizeValue(lifestyle.cleanliness_level)}
          </p>
        </div>

        <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm font-semibold text-white">Why this matters</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Lifestyle fit often decides whether a place feels easy, respectful,
            and sustainable long after move-in day.
          </p>
        </div>
      </aside>
    </div>
  );
};

export default StepLifestyle;
