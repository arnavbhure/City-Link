import {
  BadgeCheck,
  CalendarDays,
  GraduationCap,
  Mail,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { profileMockData } from "./profileMockData";
import ProfileCard from "./ui/ProfileCard";
import ProfileMetricGrid from "./ui/ProfileMetricGrid";

const formatCollegeYear = (year) => {
  if (!year && year !== 0) {
    return "Not added";
  }

  const suffixMap = { 1: "st", 2: "nd", 3: "rd" };
  const suffix = suffixMap[year] ?? "th";
  return `${year}${suffix} year`;
};

const formatCreatedAt = (value) => {
  if (!value) {
    return { date: "Not available", timestamp: "Not available" };
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return { date: "Invalid date", timestamp: value };
  }

  return {
    date: new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date),
    timestamp: new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date),
  };
};

const buildProfileIdentity = (profile) => {
  const fullName = profile.full_name?.trim() || "Unknown user";
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return {
    fullName,
    initials: initials || "U",
  };
};

const DetailList = ({ items }) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-[1.3rem] border border-white/10 bg-slate-950/55 p-4 sm:p-5"
        >
          <div className="flex items-center gap-2 text-slate-400">
            {Icon ? <Icon className="h-4 w-4 text-indigo-300" /> : null}
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">
              {label}
            </p>
          </div>
          <p className="mt-3 break-words text-sm leading-7 text-slate-100 sm:text-base">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
};

const StatusPill = ({ active, activeLabel, inactiveLabel }) => {
  const label = active ? activeLabel : inactiveLabel;
  const toneClass = active
    ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
    : "border-amber-400/20 bg-amber-500/10 text-amber-100";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${toneClass}`}
    >
      <BadgeCheck className="h-3.5 w-3.5" />
      {label}
    </span>
  );
};

const UserProfilePage = ({ profile = profileMockData }) => {
  const identity = buildProfileIdentity(profile);
  const createdAt = formatCreatedAt(profile.created_at);
  const collegeYear = formatCollegeYear(profile.clg_year);

  const metrics = [
    {
      label: "Age",
      value: profile.age ?? "Not added",
      hint: "Basic age information from the profile record.",
      icon: UserRound,
      tone: "indigo",
    },
    {
      label: "City",
      value: profile.city || "Not added",
      hint: "Current city set on the user profile.",
      icon: MapPin,
      tone: "slate",
    },
    {
      label: "Course",
      value: profile.course || "Not added",
      hint: "Academic program shown in the account.",
      icon: GraduationCap,
      tone: "amber",
    },
    {
      label: "College Year",
      value: collegeYear,
      hint: "Current year of study from the student profile.",
      icon: CalendarDays,
      tone: "emerald",
    },
  ];

  const academicDetails = [
    {
      label: "College",
      value: profile.college || "Not added",
      icon: GraduationCap,
    },
    { label: "Course", value: profile.course || "Not added", icon: UserRound },
    { label: "Year", value: collegeYear, icon: CalendarDays },
    { label: "City", value: profile.city || "Not added", icon: MapPin },
  ];

  const accountDetails = [
    { label: "Email", value: profile.email || "Not added", icon: Mail },
    {
      label: "Profile ID",
      value: profile.id || "Not added",
      icon: ShieldCheck,
    },
    { label: "Created On", value: createdAt.date, icon: CalendarDays },
    { label: "Created At", value: createdAt.timestamp, icon: CalendarDays },
  ];

  const statusDetails = [
    {
      label: "Email / account verification",
      value: profile.is_verified ? "Verified" : "Not verified",
    },
    {
      label: "Open for listing",
      value: profile.open_for_listing ? "Available" : "Not available",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-8 h-72 w-72 rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute right-[-8%] top-20 h-96 w-96 rounded-full bg-indigo-500/14 blur-3xl" />
        <div className="absolute bottom-[-12%] left-1/3 h-80 w-80 rounded-full bg-sky-400/8 blur-3xl" />
      </div>

      <section className="relative px-4 pb-16 pt-28 sm:px-8 sm:pb-18 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
          <ProfileCard className="overflow-hidden bg-gradient-to-br from-slate-900/88 via-slate-900/72 to-indigo-950/40">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-24 w-24 items-center justify-center rounded-[1.8rem] border border-white/10 bg-gradient-to-br from-indigo-500/25 via-slate-900/90 to-cyan-400/20 text-3xl font-black text-white shadow-[0_24px_60px_-32px_rgba(99,102,241,0.85)] sm:h-28 sm:w-28 sm:text-4xl">
                  {identity.initials}
                </div>

                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusPill
                      active={Boolean(profile.is_verified)}
                      activeLabel="Verified"
                      inactiveLabel="Not verified"
                    />
                    <StatusPill
                      active={Boolean(profile.open_for_listing)}
                      activeLabel="Open for listing"
                      inactiveLabel="Listing closed"
                    />
                  </div>

                  <h1 className="mt-4 text-[2.4rem] font-black leading-none tracking-tight text-white sm:text-5xl">
                    {identity.fullName}
                  </h1>

                  <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                    Student profile overview built directly from the stored user
                    record.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/65 px-3.5 py-2 text-sm text-slate-200">
                      <Mail className="h-4 w-4 text-indigo-300" />
                      {profile.email || "No email"}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/65 px-3.5 py-2 text-sm text-slate-200">
                      <MapPin className="h-4 w-4 text-indigo-300" />
                      {profile.city || "No city"}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/65 px-3.5 py-2 text-sm text-slate-200">
                      <GraduationCap className="h-4 w-4 text-indigo-300" />
                      {profile.college || "No college"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-sm rounded-[1.6rem] border border-white/10 bg-slate-950/55 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300">
                  Account snapshot
                </p>
                <div className="mt-4 space-y-3">
                  {statusDetails.map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-3.5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {label}
                      </p>
                      <p className="mt-2 text-sm font-medium text-slate-100">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ProfileCard>

          <ProfileMetricGrid metrics={metrics} />

          <div>
            <ProfileCard
              eyebrow="Academic Profile"
              title="Student information"
              description="This section renders only the academic and location data available in the current user payload."
            >
              <DetailList items={academicDetails} />
            </ProfileCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfilePage;
