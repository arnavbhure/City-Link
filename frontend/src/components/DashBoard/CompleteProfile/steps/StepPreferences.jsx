import { Users } from "lucide-react";
import OptionGroup from "../ui/OptionGroup";
import OptionPill from "../ui/OptionPill";
import ReviewItem from "../ui/ReviewItem";
import StepIntro from "../ui/StepIntro";
import ToggleField from "../ui/ToggleField";
import {
  cardClassName,
  humanizeValue,
} from "../utils/completeProfileUtils";

const StepPreferences = ({ preferences, onPreferenceChange }) => {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-6">
        <StepIntro
          eyebrow="Step 2"
          title="Set the roommate basics"
          description="These filters shape who you see first, so keep them broad unless something is a true must-have."
        />

        <div className={`${cardClassName} space-y-6`}>
          <OptionGroup
            title="Preferred gender"
            description="Choose who you would feel comfortable sharing a place with."
          >
            {["male", "female", "any"].map((option) => (
              <OptionPill
                key={option}
                label={humanizeValue(option)}
                selected={preferences.preferred_gender === option}
                onClick={() => onPreferenceChange("preferred_gender", option)}
              />
            ))}
          </OptionGroup>

          <OptionGroup
            title="Food preference"
            description="Useful for kitchen setup, cooking habits, and food boundaries."
          >
            {["veg", "non-veg", "any"].map((option) => (
              <OptionPill
                key={option}
                label={humanizeValue(option)}
                selected={preferences.food_preference === option}
                onClick={() => onPreferenceChange("food_preference", option)}
              />
            ))}
          </OptionGroup>

          <OptionGroup
            title="Smoking preference"
            description="Set the vibe you want in shared spaces."
          >
            {["yes", "no", "any"].map((option) => (
              <OptionPill
                key={option}
                label={humanizeValue(option)}
                selected={preferences.smoking_preference === option}
                onClick={() => onPreferenceChange("smoking_preference", option)}
              />
            ))}
          </OptionGroup>

          <div className="grid gap-4 md:grid-cols-2">
            <ToggleField
              label="Furnished required"
              description="Only show options where the space already comes furnished."
              checked={preferences.furnished_required}
              onChange={(value) => onPreferenceChange("furnished_required", value)}
            />

            <ToggleField
              label="Wants shared chores"
              description="Prioritize roommates who are open to splitting cleaning and house tasks."
              checked={preferences.wants_shared_chores}
              onChange={(value) =>
                onPreferenceChange("wants_shared_chores", value)
              }
            />
          </div>
        </div>
      </div>

      <aside className={`${cardClassName} space-y-4`}>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-cyan-200">
          <Users className="h-4 w-4" />
          Preference snapshot
        </div>

        <ReviewItem
          label="Gender"
          value={humanizeValue(preferences.preferred_gender)}
        />
        <ReviewItem
          label="Food"
          value={humanizeValue(preferences.food_preference)}
        />
        <ReviewItem
          label="Smoking"
          value={humanizeValue(preferences.smoking_preference)}
        />
        <ReviewItem
          label="Furnished"
          value={humanizeValue(preferences.furnished_required)}
        />
        <ReviewItem
          label="Shared chores"
          value={humanizeValue(preferences.wants_shared_chores)}
        />
      </aside>
    </div>
  );
};

export default StepPreferences;
