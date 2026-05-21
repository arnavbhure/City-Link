import {
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Home,
  MapPin,
  PencilLine,
  Search,
  ShieldCheck,
  UserRoundCheck,
  Users,
} from "lucide-react";

const hasValue = (value) =>
  value !== null && value !== undefined && String(value).trim() !== "";

export const getFirstName = (user = {}) =>
  user.full_name?.split(" ")[0] || "there";

export const getProfileCompletion = (user = {}) => {
  const fields = [
    user.full_name,
    user.email,
    user.college,
    user.city,
    user.course,
    user.clg_year,
  ];

  const completedFields = fields.filter(hasValue).length;
  const baseCompletion = Math.round((completedFields / fields.length) * 70);
  const profileBonus = user.profile_listing_completed ? 30 : 0;

  return Math.min(baseCompletion + profileBonus, 100);
};

export const getDashboardStats = (user = {}) => [
  {
    label: "Profile readiness",
    value: `${getProfileCompletion(user)}%`,
    detail: user.profile_listing_completed
      ? "Roommate profile complete"
      : "Complete profile to improve matches",
    icon: UserRoundCheck,
    tone: "text-cyan-200",
  },
  {
    label: "Listing visibility",
    value: user.open_for_listing ? "Open" : "Hidden",
    detail: user.open_for_listing
      ? "Your profile can appear in roommate search"
      : "Turn on when you are ready to be discovered",
    icon: user.open_for_listing ? Eye : EyeOff,
    tone: user.open_for_listing ? "text-emerald-200" : "text-slate-300",
  },
  {
    label: "Search city",
    value: user.city || "Not set",
    detail: user.college || "Add city and college for better context",
    icon: MapPin,
    tone: "text-indigo-200",
  },
  {
    label: "Account trust",
    value: user.is_verified ? "Verified" : "Pending",
    detail: user.is_verified
      ? "Email verification is complete"
      : "Verify your email to unlock trust signals",
    icon: ShieldCheck,
    tone: user.is_verified ? "text-emerald-200" : "text-amber-200",
  },
];

export const getWorkspaceLinks = (user = {}) => [
  {
    icon: Home,
    label: "Overview",
    href: "/dashboard",
    active: true,
  },
  {
    icon: Users,
    label: "Roommates",
    href: "/dashboard/explore-roomates",
  },
  {
    icon: Building2,
    label: "Housing",
    href: "/dashboard/explore-housing",
  },
  {
    icon: PencilLine,
    label: user.profile_listing_completed ? "Edit profile" : "Complete profile",
    href: user.profile_listing_completed ? "/profile/edit" : "/complete-profile",
  },
];

export const getQuickActions = (user = {}) => [
  {
    icon: Users,
    title: "Find roommates",
    description: "Browse compatible students by city, budget, and routine.",
    href: "/dashboard/explore-roomates",
    cta: "Explore matches",
    tone: "from-cyan-300/80 via-indigo-300/70 to-transparent",
  },
  {
    icon: Search,
    title: "Browse housing",
    description: "Review rooms, PGs, and flats around your search city.",
    href: "/dashboard/explore-housing",
    cta: "See housing",
    tone: "from-indigo-300/80 via-sky-300/70 to-transparent",
  },
  {
    icon: Building2,
    title: "Post a listing",
    description: "Publish an available space for students looking nearby.",
    href: "/dashboard/post-listing",
    cta: "Create listing",
    tone: "from-emerald-300/80 via-cyan-300/60 to-transparent",
  },
  {
    icon: user.profile_listing_completed ? PencilLine : CheckCircle2,
    title: user.profile_listing_completed ? "Refine profile" : "Complete profile",
    description: user.profile_listing_completed
      ? "Keep your student details, budget, and lifestyle signals current."
      : "Finish your profile so roommate matching can work properly.",
    href: user.profile_listing_completed ? "/profile/edit" : "/complete-profile",
    cta: user.profile_listing_completed ? "Edit profile" : "Finish setup",
    tone: "from-violet-300/80 via-indigo-300/60 to-transparent",
  },
];

export const getReadinessItems = (user = {}) => [
  {
    label: "Account verified",
    done: Boolean(user.is_verified),
    detail: "Trust starts with a verified student account.",
  },
  {
    label: "City and college added",
    done: hasValue(user.city) && hasValue(user.college),
    detail: "Location context improves roommate and housing relevance.",
  },
  {
    label: "Roommate profile completed",
    done: Boolean(user.profile_listing_completed),
    detail: "Budget and lifestyle details power better matching.",
  },
  {
    label: "Visible in roommate search",
    done: Boolean(user.open_for_listing),
    detail: "Opt in when you are ready to receive roommate interest.",
  },
];
