import { MoonStar, Sparkles, Users, Wallet } from "lucide-react";

export const TOTAL_STEPS = 4;
export const BIO_LIMIT = 200;

export const STEP_META = [
  {
    title: "Budget & Location",
    description: "Set your rent range and the city you want to live in.",
    icon: Wallet,
  },
  {
    title: "Preferences",
    description: "Choose the roommate and home setup that feels right.",
    icon: Users,
  },
  {
    title: "Lifestyle",
    description: "Tell us about your rhythm, routine, and cleanliness style.",
    icon: MoonStar,
  },
  {
    title: "Bio & Review",
    description: "Add a short intro and review the full profile before submit.",
    icon: Sparkles,
  },
];

export const initialFormState = {
  user_preferences: {
    budget_min: "",
    budget_max: "",
    preferred_gender: "any",
    food_preference: "any",
    smoking_preference: "any",
    preferred_city: "",
    furnished_required: false,
    wants_shared_chores: false,
  },
  user_lifestyle: {
    lifestyle_type: "balanced",
    sleep_schedule: "any",
    cleanliness_level: "medium",
    bio: "",
  },
};

export const inputClassName =
  "mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-cyan-400/20";

export const cardClassName =
  "rounded-[1.75rem] border border-white/10 bg-slate-950/40 p-5 shadow-[0_28px_80px_-48px_rgba(56,189,248,0.6)] backdrop-blur-sm sm:p-6";

export const humanizeValue = (value) => {
  if (value === "" || value === null || value === undefined) {
    return "Not specified";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

export const formatBudgetValue = (value) => {
  if (value === "" || value === null || value === undefined) {
    return "Not set";
  }

  return Number(value).toLocaleString();
};

export const getStepErrors = ({ stepIndex, preferences, lifestyle }) => {
  const stepErrors = {};

  if (stepIndex === 0) {
    if (preferences.budget_min === "") {
      stepErrors.budget_min = "Enter your minimum monthly budget.";
    } else if (Number(preferences.budget_min) < 0) {
      stepErrors.budget_min = "Minimum budget should be zero or higher.";
    }

    if (preferences.budget_max === "") {
      stepErrors.budget_max = "Enter your maximum monthly budget.";
    } else if (Number(preferences.budget_max) < 0) {
      stepErrors.budget_max = "Maximum budget should be zero or higher.";
    }

    if (
      preferences.budget_min !== "" &&
      preferences.budget_max !== "" &&
      Number(preferences.budget_min) > Number(preferences.budget_max)
    ) {
      stepErrors.budget_max =
        "Maximum budget should be greater than or equal to the minimum.";
    }
  }

  if (stepIndex === 3 && lifestyle.bio.length > BIO_LIMIT) {
    stepErrors.bio = `Bio should stay under ${BIO_LIMIT} characters.`;
  }

  return stepErrors;
};

export const getFirstInvalidStep = ({ preferences, lifestyle }) => {
  for (let stepIndex = 0; stepIndex < TOTAL_STEPS; stepIndex += 1) {
    if (
      Object.keys(
        getStepErrors({
          stepIndex,
          preferences,
          lifestyle,
        }),
      ).length > 0
    ) {
      return stepIndex;
    }
  }

  return -1;
};

export const getReviewItems = ({ preferences, lifestyle }) => [
  {
    label: "Budget range",
    value: `${formatBudgetValue(preferences.budget_min)} - ${formatBudgetValue(
      preferences.budget_max,
    )} / month`,
  },
  {
    label: "Preferred city",
    value: preferences.preferred_city || "Open to different cities",
  },
  {
    label: "Preferred gender",
    value: humanizeValue(preferences.preferred_gender),
  },
  {
    label: "Food preference",
    value: humanizeValue(preferences.food_preference),
  },
  {
    label: "Smoking preference",
    value: humanizeValue(preferences.smoking_preference),
  },
  {
    label: "Furnished required",
    value: humanizeValue(preferences.furnished_required),
  },
  {
    label: "Shared chores",
    value: humanizeValue(preferences.wants_shared_chores),
  },
  {
    label: "Lifestyle type",
    value: humanizeValue(lifestyle.lifestyle_type),
  },
  {
    label: "Sleep schedule",
    value: humanizeValue(lifestyle.sleep_schedule),
  },
  {
    label: "Cleanliness level",
    value: humanizeValue(lifestyle.cleanliness_level),
  },
  {
    label: "Bio",
    value: lifestyle.bio || "No bio added yet",
  },
];
