export const hasValue = (value) =>
  value !== undefined && value !== null && value !== "";

const getString = (value) => (typeof value === "string" ? value.trim() : "");

export const humanizeValue = (value, fallback = "Not shared") => {
  if (!hasValue(value) && value !== false) {
    return fallback;
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value)
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

export const formatCurrency = (value) => {
  if (!hasValue(value) && value !== 0) {
    return "Not set";
  }

  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return "Not set";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatStudyYear = (value) => {
  if (!hasValue(value) && value !== 0) {
    return "Year not shared";
  }

  const numericYear = Number(value);

  if (Number.isNaN(numericYear)) {
    return `${value}`;
  }

  const suffixMap = { 1: "st", 2: "nd", 3: "rd" };
  const suffix = suffixMap[numericYear] ?? "th";

  return `${numericYear}${suffix} year`;
};

export const createInitialProfileDraft = (profile = {}) => ({
  full_name: getString(profile.full_name || profile.name),
  email: getString(profile.email),
  city: getString(profile.city),
  clg_year: getString(profile.clg_year || profile.year) || "1",
  college: getString(profile.college || profile.university),
  course: getString(profile.course),
  lifestyle_type: getString(profile.lifestyle_type) || "balanced",
  sleep_schedule: getString(profile.sleep_schedule) || "any",
  cleanliness_level: getString(profile.cleanliness_level) || "medium",
  bio: getString(profile.bio),
  budget_min: hasValue(profile.budget_min) ? String(profile.budget_min) : "",
  budget_max: hasValue(profile.budget_max) ? String(profile.budget_max) : "",
  food_preference: getString(profile.food_preference) || "any",
  smoking_preference: getString(profile.smoking_preference) || "any",
  preferred_city: getString(profile.preferred_city || profile.city),
  furnished_required: Boolean(profile.furnished_required),
  wants_shared_chores: Boolean(profile.wants_shared_chores),
  preferred_gender: getString(profile.preferred_gender) || "any",
});

export const buildBudgetSummary = (minimum, maximum) => {
  const hasMinimum = hasValue(minimum);
  const hasMaximum = hasValue(maximum);

  if (!hasMinimum && !hasMaximum) {
    return "Budget not set yet";
  }

  const minLabel = formatCurrency(minimum);
  const maxLabel = formatCurrency(maximum);

  if (!hasMinimum) {
    return `Up to ${maxLabel}`;
  }

  if (!hasMaximum) {
    return `From ${minLabel}`;
  }

  return `${minLabel} - ${maxLabel}`;
};

export const buildAcademicSummary = (draft) => {
  const yearLabel = hasValue(draft.clg_year)
    ? formatStudyYear(draft.clg_year)
    : "";
  const parts = [];

  if (hasValue(draft.course)) {
    parts.push(draft.course);
  }

  if (hasValue(draft.college)) {
    parts.push(`at ${draft.college}`);
  }

  if (hasValue(draft.city)) {
    parts.push(`in ${draft.city}`);
  }

  if (parts.length > 0) {
    const summary = parts.join(" ");
    return yearLabel ? `${summary} · ${yearLabel}` : summary;
  }

  return yearLabel || "Add your academic details";
};

export const buildLifestyleSummary = (draft) => {
  const parts = [
    draft.lifestyle_type,
    draft.sleep_schedule,
    draft.cleanliness_level,
  ]
    .filter(hasValue)
    .map((value) => humanizeValue(value));

  return parts.length > 0 ? parts.join(" · ") : "Add your lifestyle rhythm";
};

export const buildPreviewLine = (draft) => {
  const parts = [];

  if (hasValue(draft.course)) {
    parts.push(draft.course);
  }

  if (hasValue(draft.college)) {
    parts.push(`at ${draft.college}`);
  }

  if (hasValue(draft.city)) {
    parts.push(`in ${draft.city}`);
  }

  return parts.length > 0
    ? parts.join(" ")
    : "Add a few academic details to shape the preview.";
};

export const formatSavedAt = (date) => {
  if (!(date instanceof Date)) {
    return "";
  }

  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};
