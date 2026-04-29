import { createElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeftRight,
  BadgeCheck,
  BedDouble,
  BookOpenText,
  Building2,
  CheckCircle2,
  CookingPot,
  GraduationCap,
  IdCard,
  MapPin,
  MoonStar,
  ShieldCheck,
  Sparkles,
  Users,
  VolumeX,
  Wallet,
} from "lucide-react";
import getViewProfile from "../../api/Profile/getViewProfile";
import ErrorPage from "../../ErrorPage";
import LoadingSpinner from "../DashBoard/Loading/LoadingSpinner";

const hasValue = (value) =>
  value !== undefined && value !== null && value !== "";

const formatStudyYear = (year) => {
  if (!hasValue(year) && year !== 0) {
    return "Year not shared";
  }

  const numericYear = Number(year);

  if (Number.isNaN(numericYear)) {
    return `${year}`;
  }

  const suffixMap = { 1: "st", 2: "nd", 3: "rd" };
  const suffix = suffixMap[numericYear] ?? "th";
  return `${numericYear}${suffix} year`;
};

const humanizeValue = (value, fallback = "Not shared") => {
  if (!hasValue(value) && value !== false) {
    return fallback;
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value)
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

const formatCurrency = (value) => {
  if (!hasValue(value) && value !== 0) {
    return "Not shared";
  }

  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return "Not shared";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

const buildBudgetRange = (minimum, maximum) => {
  const min = formatCurrency(minimum);
  const max = formatCurrency(maximum);

  if (min === "Not shared" && max === "Not shared") {
    return "Budget not shared";
  }

  if (min === "Not shared") {
    return `Up to ${max}`;
  }

  if (max === "Not shared") {
    return `From ${min}`;
  }

  return `${min} - ${max}`;
};

const buildIdentity = (profile) => {
  const displayName =
    profile.name?.trim() || profile.full_name?.trim() || "Unknown student";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return {
    displayName,
    initials: initials || "U",
  };
};

const buildBooleanLabel = (value, positiveLabel, negativeLabel) => {
  return value ? positiveLabel : negativeLabel;
};

const getLifestylePhrase = (value) => {
  const lifestyle = String(value || "").toLowerCase();

  if (lifestyle === "quiet") {
    return "I prefer a quieter home where people can study and recharge.";
  }

  if (lifestyle === "social") {
    return "I enjoy a social home, while still respecting personal downtime.";
  }

  if (lifestyle === "balanced") {
    return "I like a balanced home with space for both focus time and conversation.";
  }

  return "I care about having a respectful home routine that works for everyone.";
};

const getCleanlinessPhrase = (value) => {
  const cleanliness = String(value || "").toLowerCase();

  if (cleanliness === "high") {
    return "I like keeping shared spaces clean and organized.";
  }

  if (cleanliness === "medium") {
    return "I try to keep shared spaces reasonably tidy.";
  }

  if (cleanliness === "low") {
    return "I am relaxed about cleaning routines as long as expectations are clear.";
  }

  return "I prefer discussing shared-space expectations early.";
};

const getSleepPhrase = (value) => {
  const sleep = String(value || "").toLowerCase();

  if (sleep === "night_owl") {
    return "I usually keep later hours, so I do best with someone comfortable with that rhythm.";
  }

  if (sleep === "early_bird") {
    return "I usually keep an early routine and value calm mornings.";
  }

  if (sleep === "flexible" || sleep === "any") {
    return "My schedule is fairly flexible, so I can adjust to a reasonable house rhythm.";
  }

  return "I am comfortable talking through schedules before moving in.";
};

const getFoodAndSmokingPhrase = (food, smoking) => {
  const foodPreference = String(food || "").toLowerCase();
  const smokingPreference = String(smoking || "").toLowerCase();
  const foodText =
    foodPreference === "veg"
      ? "I prefer vegetarian food"
      : foodPreference === "non_veg"
        ? "I am comfortable with non-vegetarian food"
        : "I am flexible about food habits";
  const smokingText =
    smokingPreference === "no"
      ? "a non-smoking setup"
      : smokingPreference === "yes"
        ? "a roommate who is okay with smoking"
        : "clear smoking preferences";

  return `${foodText} and would prefer ${smokingText}.`;
};

const getChoresPhrase = (value) => {
  return value
    ? "I am happy to split chores clearly so the place stays easy to live in."
    : "I prefer keeping chores independent, with expectations agreed upfront.";
};

const buildRoommateBio = ({
  profile,
  identity,
  university,
  course,
  studyYear,
  city,
  budgetRange,
}) => {
  const yearText = studyYear !== "Year not shared" ? `${studyYear} ` : "";
  const intro =
    course !== "Course not shared" && university !== "University not shared"
      ? `I am ${identity.displayName}, a ${yearText}${course} student at ${university} in ${city}.`
      : `I am ${identity.displayName}, a student looking for a compatible place in ${city}.`;
  const budgetLine =
    budgetRange === "Budget not shared"
      ? "I am looking for a setup where expectations are clear from the start."
      : `My budget is ${budgetRange.toLowerCase()}.`;

  return [
    `${intro} ${budgetLine}`,
    `${getLifestylePhrase(profile.lifestyle_type)} ${getCleanlinessPhrase(
      profile.cleanliness_level,
    )}`,
    getSleepPhrase(profile.sleep_schedule),
    `${getFoodAndSmokingPhrase(
      profile.food_preference,
      profile.smoking_preference,
    )} ${getChoresPhrase(profile.wants_shared_chores)}`,
  ];
};

const buildCompatibilityTags = (profile) => {
  const lifestyle = String(profile.lifestyle_type || "").toLowerCase();
  const cleanliness = String(profile.cleanliness_level || "").toLowerCase();
  const sleep = String(profile.sleep_schedule || "").toLowerCase();
  const food = String(profile.food_preference || "").toLowerCase();
  const smoking = String(profile.smoking_preference || "").toLowerCase();
  const tags = [];

  if (lifestyle) {
    tags.push(`${humanizeValue(lifestyle)} Lifestyle`);
  }

  if (cleanliness) {
    tags.push(`${humanizeValue(cleanliness)} Cleanliness`);
  }

  if (sleep) {
    tags.push(humanizeValue(sleep));
  }

  if (food === "veg") {
    tags.push("Vegetarian");
  } else if (food === "non_veg") {
    tags.push("Non-Veg Friendly");
  } else if (food) {
    tags.push(`${humanizeValue(food)} Food`);
  }

  if (smoking === "no") {
    tags.push("Non-Smoking");
  } else if (smoking === "yes") {
    tags.push("Smoking Friendly");
  }

  if (profile.wants_shared_chores) {
    tags.push("Shared Chores");
  } else if (profile.wants_shared_chores === false) {
    tags.push("Independent Chores");
  }

  const fallbackTags = [
    "Clear Expectations",
    "Flexible Routine",
    "Shared Space Aware",
  ];

  return [...new Set([...tags, ...fallbackTags])].slice(0, 5);
};

const accentClasses = [
  "from-cyan-400/30 via-sky-500/10 to-transparent",
  "from-indigo-400/30 via-violet-500/10 to-transparent",
  "from-fuchsia-400/25 via-rose-500/10 to-transparent",
  "from-emerald-400/25 via-teal-500/10 to-transparent",
];

const SectionHeading = ({ eyebrow, title, description }) => {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/85">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-[2.6rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
          {description}
        </p>
      ) : null}
    </div>
  );
};

const IdentityChip = ({ icon, label, value }) => {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 backdrop-blur-xl">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/5 text-white">
        {createElement(icon, { className: "h-4 w-4" })}
      </div>
      <div>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
          {label}
        </p>
        <p className="mt-1 text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
};

const OrbitTag = ({ icon, label, value, className = "" }) => {
  return (
    <div
      className={`absolute rounded-full border border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur-xl shadow-[0_24px_80px_-40px_rgba(15,23,42,0.95)] ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-cyan-200">
          {createElement(icon, { className: "h-4 w-4" })}
        </div>
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
            {label}
          </p>
          <p className="mt-1 text-sm font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

const LifestyleSignal = ({ icon, label, value, helper, index }) => {
  const offsetClass =
    index === 1 ? "md:translate-y-6" : index === 2 ? "md:-translate-y-2" : "";

  return (
    <article className={offsetClass}>
      <div
        className={`rounded-[2rem] bg-gradient-to-br p-[1px] ${accentClasses[index % accentClasses.length]}`}
      >
        <div className="relative h-full overflow-hidden rounded-[calc(2rem-1px)] bg-slate-950/82 px-6 py-6 backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.06] to-transparent" />
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-white/18 via-white/8 to-transparent text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
              {createElement(icon, { className: "h-5 w-5" })}
            </div>
            <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
              {label}
            </p>
            <p className="mt-3 text-2xl font-black tracking-tight text-white">
              {value}
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-300">{helper}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

const PreferenceToken = ({ icon, label, value, index }) => {
  return (
    <div
      className={`rounded-full bg-gradient-to-r p-[1px] ${accentClasses[index % accentClasses.length]}`}
    >
      <div className="flex items-center gap-3 rounded-full bg-slate-950/85 px-4 py-3 backdrop-blur-xl">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white">
          {createElement(icon, { className: "h-4 w-4" })}
        </div>
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
            {label}
          </p>
          <p className="mt-1 text-sm font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

const DetailLine = ({ label, value }) => {
  return (
    <div className="border-b border-white/8 py-4 last:border-b-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
          {label}
        </p>
        <p className="max-w-xl break-words text-base font-semibold text-slate-100 sm:text-right">
          {value}
        </p>
      </div>
    </div>
  );
};

const UserProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const response = await getViewProfile(id);

        if (!isMounted) {
          return;
        }

        if (!response.success) {
          setError(response.message || "Unable to load this profile.");
          setLoading(false);
          return;
        }

        setProfile(response.data?.data || {});
        setLoading(false);
      } catch {
        if (!isMounted) {
          return;
        }

        setError("Unable to load this profile.");
        setLoading(false);
      }
    };

    void fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="mt-40 text-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorPage />;
  }

  const identity = buildIdentity(profile || {});
  const university =
    profile.university || profile.college || "University not shared";
  const course = profile.course || "Course not shared";
  const studyYear = formatStudyYear(profile.year ?? profile.clg_year);
  const city = profile.city || "City not shared";
  const preferredCity = profile.preferred_city || city;
  const budgetRange = buildBudgetRange(profile.budget_min, profile.budget_max);
  const generatedBio = buildRoommateBio({
    profile,
    identity,
    university,
    course,
    studyYear,
    city,
    budgetRange,
  });
  const compatibilityTags = buildCompatibilityTags(profile);

  const introChips = [
    { label: "University", value: university, icon: Building2 },
    { label: "Course", value: course, icon: BookOpenText },
    { label: "Year", value: studyYear, icon: GraduationCap },
    { label: "City", value: city, icon: MapPin },
  ];

  const lifestyleSignals = [
    {
      label: "Lifestyle type",
      value: humanizeValue(profile.lifestyle_type),
      helper: "The overall home rhythm this student is most comfortable with.",
      icon: VolumeX,
    },
    {
      label: "Sleep schedule",
      value: humanizeValue(profile.sleep_schedule),
      helper: "A quick look at their day and night routine compatibility.",
      icon: MoonStar,
    },
    {
      label: "Cleanliness level",
      value: humanizeValue(profile.cleanliness_level),
      helper: "How neat and organized they prefer shared spaces to stay.",
      icon: Sparkles,
    },
  ];

  const preferenceTokens = [
    {
      label: "Preferred city",
      value: preferredCity,
      icon: MapPin,
    },
    {
      label: "Preferred gender",
      value: humanizeValue(profile.preferred_gender),
      icon: Users,
    },
    {
      label: "Food preference",
      value: humanizeValue(profile.food_preference),
      icon: CookingPot,
    },
    {
      label: "Smoking",
      value: buildBooleanLabel(
        profile.smoking_preference === "no",
        "Non-smoking preferred",
        humanizeValue(profile.smoking_preference),
      ),
      icon: ShieldCheck,
    },
    {
      label: "Furnished setup",
      value: buildBooleanLabel(
        profile.furnished_required,
        "Furnished required",
        "Flexible on furnishing",
      ),
      icon: BedDouble,
    },
    {
      label: "Shared chores",
      value: buildBooleanLabel(
        profile.wants_shared_chores,
        "Open to shared chores",
        "Prefers independent chores",
      ),
      icon: BadgeCheck,
    },
  ];

  const detailLines = [
    { label: "Name", value: identity.displayName },
    { label: "Budget min", value: formatCurrency(profile.budget_min) },
    { label: "Budget max", value: formatCurrency(profile.budget_max) },
    { label: "University", value: university },
    { label: "Course", value: course },
    { label: "Year", value: studyYear },
    { label: "City", value: city },
    { label: "Preferred city", value: preferredCity },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:120px_120px] opacity-20" />
        <div className="absolute left-[-12%] top-8 h-80 w-80 rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute right-[-10%] top-20 h-[28rem] w-[28rem] rounded-full bg-indigo-500/14 blur-3xl" />
        <div className="absolute bottom-[-12%] left-1/3 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <section className="relative px-4 pb-24 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-medium text-cyan-200 backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.95)]" />
                CityLink roommate profile
              </div>

              <h1
                className="mt-7 text-[3rem] font-black leading-[0.93] tracking-tight text-white sm:text-[4.8rem]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {identity.displayName ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-500">
                    {identity.displayName}
                  </span>
                ) : null}
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
                {course} student, {studyYear}, based in {city}.
              </p>

              <div className="mt-8 rounded-[2.2rem] bg-gradient-to-r from-white/[0.12] via-white/[0.03] to-transparent p-[1px]">
                <div className="rounded-[calc(2.2rem-1px)] bg-slate-950/75 px-6 py-6 backdrop-blur-xl sm:px-7">
                  <div className="flex items-center gap-2 text-cyan-200">
                    <Sparkles className="h-4 w-4" />
                    <p className="text-xs font-semibold uppercase tracking-[0.22em]">
                      Compatibility bio
                    </p>
                  </div>
                  <div className="mt-4 space-y-2 text-base leading-8 text-slate-100 sm:text-lg">
                    {generatedBio.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {introChips.map((chip) => (
                  <IdentityChip key={chip.label} {...chip} />
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {compatibilityTags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur-xl"
                  >
                    <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-[26rem] items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/18 via-indigo-500/10 to-fuchsia-500/12 blur-3xl" />
              <div className="relative h-[24rem] w-[24rem] sm:h-[26rem] sm:w-[26rem]">
                <div className="absolute inset-0 rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),rgba(2,6,23,0.02)_45%,transparent_72%)]" />
                <div className="absolute inset-6 rounded-full border border-white/10 border-dashed" />
                <div className="absolute inset-14 rounded-full border border-white/10" />

                <div className="absolute left-1/2 top-1/2 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-slate-800/90 via-slate-900/86 to-indigo-950/72 text-center shadow-[0_30px_90px_-40px_rgba(59,130,246,0.72)] sm:h-52 sm:w-52">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-cyan-200/85">
                    Budget range
                  </p>
                  <p className="mt-3 max-w-[10rem] text-2xl font-black leading-tight text-white sm:text-[1.9rem]">
                    {budgetRange}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                    <Wallet className="h-3.5 w-3.5 text-cyan-300" />
                    Monthly comfort zone
                  </div>
                </div>

                <OrbitTag
                  className="left-0 top-7"
                  icon={MapPin}
                  label="Preferred city"
                  value={preferredCity}
                />
                <OrbitTag
                  className="right-0 top-16"
                  icon={Users}
                  label="Preferred gender"
                  value={humanizeValue(profile.preferred_gender)}
                />
                <OrbitTag
                  className="bottom-12 left-0"
                  icon={BedDouble}
                  label="Furnished"
                  value={buildBooleanLabel(
                    profile.furnished_required,
                    "Required",
                    "Flexible",
                  )}
                />
                <OrbitTag
                  className="bottom-5 right-4"
                  icon={ArrowLeftRight}
                  label="Shared chores"
                  value={buildBooleanLabel(
                    profile.wants_shared_chores,
                    "Open",
                    "Optional",
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mt-20">
            <SectionHeading
              eyebrow="Lifestyle"
              title={`How ${profile.full_name.split(" ")[0]} likes to live `}
              description=""
            />

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {lifestyleSignals.map((signal, index) => (
                <LifestyleSignal key={signal.label} {...signal} index={index} />
              ))}
            </div>
          </div>

          <div className="mt-20 grid gap-14 xl:grid-cols-[1.02fr_0.98fr]">
            <div>
              <SectionHeading
                eyebrow="Preferences"
                title="Match filters and roommate preferences"
                description="Everything that helps narrow down a comfortable living arrangement."
              />

              <div className="mt-8 flex flex-wrap gap-3">
                {preferenceTokens.map((token, index) => (
                  <PreferenceToken key={token.label} {...token} index={index} />
                ))}
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Snapshot"
                title="Profile details"
                description=""
              />

              <div className="mt-8 rounded-[2rem] bg-gradient-to-r from-white/[0.1] via-white/[0.03] to-transparent p-[1px]">
                <div className="rounded-[calc(2rem-1px)] bg-slate-950/78 px-6 py-5 backdrop-blur-xl sm:px-7">
                  <div className="mb-2 flex items-center gap-2 text-cyan-200">
                    <IdCard className="h-4 w-4" />
                    <p className="text-xs font-semibold uppercase tracking-[0.22em]">
                      Stored profile data
                    </p>
                  </div>

                  <div className="mt-4">
                    {detailLines.map((line) => (
                      <DetailLine key={line.label} {...line} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfilePage;
