import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  BadgeCheck,
  BookOpenText,
  Building2,
  CircleOff,
  CheckCircle2,
  GraduationCap,
  MapPin,
  ShieldCheck,
  UserRound,
  UserSquare2,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import getViewProfile from "../../api/Profile/getViewProfile";
import ErrorPage from "../../ErrorPage";
import LoadingSpinner from "../DashBoard/Loading/LoadingSpinner";

const formatCollegeYear = (year) => {
  if (!year && year !== 0) {
    return "Not added";
  }

  const suffixMap = { 1: "st", 2: "nd", 3: "rd" };
  const suffix = suffixMap[year] ?? "th";
  return `${year}${suffix} year`;
};

const formatBooleanValue = (value, activeLabel, inactiveLabel) => {
  return value ? activeLabel : inactiveLabel;
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

const fieldAccentClasses = [
  "from-cyan-400/30 via-sky-400/10 to-transparent",
  "from-indigo-400/30 via-violet-400/10 to-transparent",
  "from-fuchsia-400/25 via-rose-400/10 to-transparent",
  "from-emerald-400/25 via-teal-400/10 to-transparent",
];

const HeroFact = ({ icon: Icon, value, label }) => {
  return (
    <div className="inline-flex min-w-[10rem] items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-3 backdrop-blur-xl">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/5 text-white">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          {label}
        </p>
        <p className="mt-1 text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
};

const StatusPill = ({
  active,
  activeLabel,
  inactiveLabel,
  accent = "emerald",
}) => {
  const label = active ? activeLabel : inactiveLabel;
  const toneClass = active
    ? accent === "indigo"
      ? "border-indigo-400/20 bg-indigo-500/10 text-indigo-100"
      : accent === "cyan"
        ? "border-cyan-400/20 bg-cyan-500/10 text-cyan-100"
        : "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
    : "border-white/10 bg-white/[0.06] text-slate-300";
  const Icon = active ? CheckCircle2 : XCircle;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-xl ${toneClass}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
};

const OrbitChip = ({ className, icon: Icon, label, value }) => {
  return (
    <div
      className={`absolute rounded-full border border-white/10 bg-slate-950/75 px-4 py-3 backdrop-blur-xl shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)] ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-indigo-200">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
            {label}
          </p>
          <p className="mt-1 text-sm font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

const FieldRibbon = ({ label, value, icon: Icon, index }) => {
  const accentClass = fieldAccentClasses[index % fieldAccentClasses.length];
  const offsetClass = index % 2 === 0 ? "md:mr-12" : "md:ml-12";

  return (
    <div className={offsetClass}>
      <div className={`rounded-[2rem] bg-gradient-to-r p-[1px] ${accentClass}`}>
        <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-slate-950/78 px-5 py-5 backdrop-blur-xl sm:px-6">
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/[0.06] to-transparent" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.35rem] bg-gradient-to-br from-white/18 via-white/8 to-transparent text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                {label}
              </p>
              <p className="mt-2 break-words text-lg font-semibold leading-7 text-white sm:text-[1.15rem]">
                {value}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const response = await getViewProfile(id);
      setLoading(false);
      if (!response.success) {
        setError(response.message);
        return;
      }
      setProfile(response.data.data);
    };
    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-40">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <>
        <ErrorPage />
      </>
    );
  }

  const identity = buildProfileIdentity(profile || {});
  const profileFields = [
    {
      label: "Full_name",
      value: identity.fullName,
      icon: UserSquare2,
    },
    {
      label: "College",
      value: profile.college || "Not added",
      icon: Building2,
    },
    {
      label: "City",
      value: profile.city || "Not added",
      icon: MapPin,
    },
    {
      label: "Clg_year",
      value: formatCollegeYear(profile.clg_year),
      icon: GraduationCap,
    },
    {
      label: "Course",
      value: profile.course || "Not added",
      icon: BookOpenText,
    },
    {
      label: "Is_verified",
      value: formatBooleanValue(
        profile.is_verified,
        "Verified",
        "Not verified",
      ),
      icon: ShieldCheck,
    },
    {
      label: "Profile_listing_completed",
      value: formatBooleanValue(
        profile.profile_listing_completed,
        "Completed",
        "Not completed",
      ),
      icon: BadgeCheck,
    },
    {
      label: "Open_for_listing",
      value: formatBooleanValue(profile.open_for_listing, "Open", "Closed"),
      icon: UserRound,
    },
  ];
  const headlineFacts = [
    {
      label: "College",
      value: profile.college || "Not added",
      icon: Building2,
    },
    {
      label: "City",
      value: profile.city || "Not added",
      icon: MapPin,
    },
    {
      label: "Course",
      value: profile.course || "Not added",
      icon: BookOpenText,
    },
    {
      label: "Clg_year",
      value: formatCollegeYear(profile.clg_year),
      icon: GraduationCap,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-8 h-72 w-72 rounded-full bg-cyan-500/14 blur-3xl" />
        <div className="absolute right-[-8%] top-20 h-96 w-96 rounded-full bg-indigo-500/16 blur-3xl" />
        <div className="absolute bottom-[-12%] left-1/3 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <section className="relative px-4 pb-20 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-medium text-cyan-200 backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.9)]" />
                CityLink profile
              </div>

              <h1
                className="mt-7 text-[3rem] font-black leading-[0.95] tracking-tight text-indigo-400 sm:text-[4.1rem]"
                style={{ fontFamily: "Montserrat" }}
              >
                {identity.fullName.split(" ")[0]}
                {identity.fullName.split(" ")[1] ? (
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-500">
                    {" " + identity.fullName.split(" ")[1]}
                  </span>
                ) : null}
              </h1>

              <div className="mt-7 flex flex-wrap gap-3">
                <StatusPill
                  active={Boolean(profile.is_verified)}
                  activeLabel="Verified"
                  inactiveLabel="Not verified"
                  accent="cyan"
                />
                <StatusPill
                  active={Boolean(profile.profile_listing_completed)}
                  activeLabel="Profile complete"
                  inactiveLabel="Profile incomplete"
                  accent="indigo"
                />
                <StatusPill
                  active={Boolean(profile.open_for_listing)}
                  activeLabel="Open for listing"
                  inactiveLabel="Listing closed"
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {headlineFacts.map((fact) => (
                  <HeroFact key={fact.label} {...fact} />
                ))}
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-[28rem] items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 via-indigo-500/10 to-fuchsia-500/15 blur-3xl" />
              <div className="relative h-[25rem] w-[25rem] max-w-full">
                <div className="absolute inset-0 rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),rgba(2,6,23,0.05)_45%,transparent_72%)]" />
                <div className="absolute inset-6 rounded-full border border-white/10 border-dashed" />
                <div className="absolute inset-16 rounded-full border border-white/10" />

                <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-slate-800/90 via-slate-900/85 to-indigo-950/70 text-5xl font-black text-white shadow-[0_30px_90px_-40px_rgba(59,130,246,0.75)]">
                  {identity.initials}
                </div>

                <OrbitChip
                  className="left-0 top-8"
                  icon={ShieldCheck}
                  label="Is_verified"
                  value={formatBooleanValue(
                    profile.is_verified,
                    "Verified",
                    "Not verified",
                  )}
                />
                <OrbitChip
                  className="right-0 top-20"
                  icon={BadgeCheck}
                  label="Profile_listing_completed"
                  value={formatBooleanValue(
                    profile.profile_listing_completed,
                    "Completed",
                    "Not completed",
                  )}
                />
                <OrbitChip
                  className="bottom-8 left-1/2 -translate-x-1/2"
                  icon={profile.open_for_listing ? UserRound : CircleOff}
                  label="Open_for_listing"
                  value={formatBooleanValue(
                    profile.open_for_listing,
                    "Open",
                    "Closed",
                  )}
                />
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-[2.6rem] ">
                  Profile details
                </h2>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {profileFields.map((field, index) => (
                <FieldRibbon key={field.label} {...field} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfilePage;
