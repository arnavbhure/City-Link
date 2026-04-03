import { createElement, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  Clock3,
  GraduationCap,
  MapPin,
  MoonStar,
  Search,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const roommateProfiles = [
  {
    name: "Riya Sharma",
    university: "Delhi University",
    course: "Psychology, 2nd year",
    city: "North Delhi",
    budget: "INR 12k - 15k",
    budgetValue: "INR 12k - 15k",
    move: "This month",
    moveValue: "This month",
    lifestyle: "Quiet",
    routine: "Early riser",
    compatibility: "94%",
    bio: "Keeps a tidy room, prefers calm evenings, and wants a place with a short campus commute.",
    tags: ["Non-smoker", "Women-only", "Wants furnished setup"],
  },
  {
    name: "Kabir Mehta",
    university: "Christ University",
    course: "BBA, 3rd year",
    city: "Koramangala, Bengaluru",
    budget: "Under INR 12k",
    budgetValue: "Under INR 12k",
    move: "Next month",
    moveValue: "Next month",
    lifestyle: "Balanced",
    routine: "Prefers planned routines",
    compatibility: "91%",
    bio: "Looking for a shared flat near transit with enough quiet for study blocks and interview prep.",
    tags: ["Vegetarian", "Likes shared chores", "Near metro preferred"],
  },
  {
    name: "Aanya Verma",
    university: "Savitribai Phule Pune University",
    course: "Design, 1st year",
    city: "Pune Central",
    budget: "INR 15k+",
    budgetValue: "INR 15k+",
    move: "Immediate",
    moveValue: "Immediate",
    lifestyle: "Quiet",
    routine: "Night owl",
    compatibility: "89%",
    bio: "Wants a safer locality, reliable Wi-Fi, and a flatmate who values boundaries and clear expectations.",
    tags: ["Needs strong Wi-Fi", "Women-only", "Creative schedule"],
  },
  {
    name: "Dev Patel",
    university: "NMIMS",
    course: "B.Com, 2nd year",
    city: "Andheri East, Mumbai",
    budget: "INR 15k+",
    budgetValue: "INR 15k+",
    move: "Next month",
    moveValue: "Next month",
    lifestyle: "Social",
    routine: "Late classes + gym",
    compatibility: "87%",
    bio: "Searching for an upbeat shared place with clean common areas, flexible guest rules, and easy local transport.",
    tags: ["Gym routine", "Co-ed okay", "Weekend social"],
  },
  {
    name: "Sneha Iyer",
    university: "IIT Madras",
    course: "M.Tech, 1st year",
    city: "Adyar, Chennai",
    budget: "INR 12k - 15k",
    budgetValue: "INR 12k - 15k",
    move: "Immediate",
    moveValue: "Immediate",
    lifestyle: "Balanced",
    routine: "Morning study blocks",
    compatibility: "92%",
    bio: "Prioritizes a well-managed apartment, calm weekdays, and roommates who communicate clearly about shared expenses.",
    tags: ["Structured routines", "Women-only", "Bills tracked together"],
  },
  {
    name: "Arjun Rao",
    university: "IIIT Hyderabad",
    course: "CSE, 4th year",
    city: "Gachibowli, Hyderabad",
    budget: "Under INR 12k",
    budgetValue: "Under INR 12k",
    move: "This month",
    moveValue: "This month",
    lifestyle: "Quiet",
    routine: "Early riser",
    compatibility: "90%",
    bio: "Looking for a practical setup near campus with reliable utilities, focused evenings, and low-noise common spaces.",
    tags: ["Budget-first", "Study-friendly", "Needs quick move-in"],
  },
];

const filterOptions = {
  city: [
    "Any city",
    "North Delhi",
    "Koramangala, Bengaluru",
    "Pune Central",
    "Andheri East, Mumbai",
    "Adyar, Chennai",
    "Gachibowli, Hyderabad",
  ],
  budget: ["Any budget", "Under INR 12k", "INR 12k - 15k", "INR 15k+"],
  move: ["Any time", "Immediate", "This month", "Next month"],
  lifestyle: ["Any lifestyle", "Quiet", "Balanced", "Social"],
};

const matchSignals = [
  {
    icon: ShieldCheck,
    title: "Trust-first profiles",
    description:
      "Shortlist students by move timing, habits, and signals that reduce roommate surprises.",
  },
  {
    icon: Clock3,
    title: "Aligned move windows",
    description:
      "See who needs a place right now versus who is planning the next semester move.",
  },
  {
    icon: BookOpenText,
    title: "Student routine fit",
    description:
      "Use lifestyle and study preferences to spot calmer, more compatible shared setups.",
  },
];

const initialFilters = {
  city: "Any city",
  budget: "Any budget",
  move: "Any time",
  lifestyle: "Any lifestyle",
};

const ExploreRoomates = () => {
  const [filters, setFilters] = useState(initialFilters);

  const filteredProfiles = roommateProfiles.filter((profile) => {
    const matchesCity =
      filters.city === "Any city" || profile.city === filters.city;
    const matchesBudget =
      filters.budget === "Any budget" || profile.budgetValue === filters.budget;
    const matchesMove =
      filters.move === "Any time" || profile.moveValue === filters.move;
    const matchesLifestyle =
      filters.lifestyle === "Any lifestyle" ||
      profile.lifestyle === filters.lifestyle;

    return matchesCity && matchesBudget && matchesMove && matchesLifestyle;
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem]">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/18 blur-3xl" />
        <div className="absolute left-6 top-28 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-8 top-20 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <section className="relative px-4 pb-16 pt-28 sm:px-8 sm:pb-18 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
          <section className="grid gap-5 rounded-[1.6rem] border border-white/10 bg-slate-900/70 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300">
                <Sparkles className="h-4 w-4" />
                Roommate discovery
              </div>

              <h1 className="mt-5 text-[2.15rem] font-black leading-none tracking-tight text-white sm:mt-6 sm:text-5xl">
                Find students who feel
                <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                  easier to live with.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Filter by city, budget, move timing, and lifestyle so the next
                conversation starts with stronger compatibility.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                  Back to dashboard
                </Link>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
                What CityLink surfaces
              </p>
              <div className="mt-5 space-y-4">
                {matchSignals.map(({ icon, title, description }) => (
                  <div
                    key={title}
                    className="rounded-[1.25rem] border border-white/10 bg-slate-950/60 p-4"
                  >
                    <div className="flex gap-4">
                      <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
                        {createElement(icon, { className: "h-5 w-5" })}
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-white sm:text-lg">
                          {title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-[0.96rem] sm:leading-7">
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
                    Match filters
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                    Narrow the list fast
                  </h2>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                  <Search className="h-4 w-4 text-indigo-300" />
                  {filteredProfiles.length} potential matches
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-300">
                    City
                  </span>
                  <select
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-indigo-400/50 focus:bg-slate-950"
                  >
                    {filterOptions.city.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-300">
                    Budget
                  </span>
                  <select
                    name="budget"
                    value={filters.budget}
                    onChange={handleFilterChange}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-indigo-400/50 focus:bg-slate-950"
                  >
                    {filterOptions.budget.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-300">
                    Move timing
                  </span>
                  <select
                    name="move"
                    value={filters.move}
                    onChange={handleFilterChange}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-indigo-400/50 focus:bg-slate-950"
                  >
                    {filterOptions.move.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-300">
                    Lifestyle
                  </span>
                  <select
                    name="lifestyle"
                    value={filters.lifestyle}
                    onChange={handleFilterChange}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-indigo-400/50 focus:bg-slate-950"
                  >
                    {filterOptions.lifestyle.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-400/10 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
                Quick read
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Smart signals to compare
              </h2>

              <div className="mt-6 space-y-4">
                <div className="rounded-[1.3rem] border border-white/10 bg-slate-950/55 p-4">
                  <div className="flex items-center gap-3">
                    <SunMedium className="h-5 w-5 text-amber-300" />
                    <span className="font-semibold text-white">
                      Daily rhythm
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Morning and night routines matter more than broad
                    personality labels once you start sharing space.
                  </p>
                </div>

                <div className="rounded-[1.3rem] border border-white/10 bg-slate-950/55 p-4">
                  <div className="flex items-center gap-3">
                    <MoonStar className="h-5 w-5 text-cyan-300" />
                    <span className="font-semibold text-white">
                      Quiet-time expectations
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Students who agree on guest rules, cleaning, and study hours
                    usually settle in faster.
                  </p>
                </div>

                <div className="rounded-[1.3rem] border border-white/10 bg-slate-950/55 p-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-indigo-300" />
                    <span className="font-semibold text-white">
                      Move timing
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Matching urgency helps you avoid great profiles that simply
                    are not moving on the same timeline.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
                  Results
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  Roommates worth opening next
                </h2>
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                Showing {filteredProfiles.length} of {roommateProfiles.length}
              </div>
            </div>

            {filteredProfiles.length ? (
              <div className="grid gap-4 xl:grid-cols-2">
                {filteredProfiles.map((profile) => (
                  <article
                    key={profile.name}
                    className="rounded-[1.45rem] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] sm:p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                          <BadgeCheck className="h-3.5 w-3.5" />
                          Compatible
                        </div>

                        <h3 className="mt-4 text-2xl font-bold text-white">
                          {profile.name}
                        </h3>
                        <p className="mt-2 text-sm text-slate-300">
                          {profile.course}
                        </p>
                      </div>

                      <div className="w-fit rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-indigo-200">
                        {profile.compatibility} match
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3">
                        <GraduationCap className="h-4 w-4 text-indigo-300" />
                        <span>{profile.university}</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3">
                        <MapPin className="h-4 w-4 text-cyan-300" />
                        <span>{profile.city}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200">
                        {profile.budget}
                      </span>
                      <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200">
                        {profile.move}
                      </span>
                      <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200">
                        {profile.lifestyle} lifestyle
                      </span>
                      <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200">
                        {profile.routine}
                      </span>
                    </div>

                    <p className="mt-5 text-sm leading-7 text-slate-300">
                      {profile.bio}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {profile.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                      View profile
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[1.45rem] border border-dashed border-white/15 bg-slate-950/40 px-6 py-10 text-center">
                <h3 className="text-xl font-semibold text-white">
                  No roommate profiles match these filters yet
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                  Try widening the city or budget range to surface more student
                  profiles.
                </p>
                <button
                  type="button"
                  onClick={() => setFilters(initialFilters)}
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Reset filters
                </button>
              </div>
            )}
          </section>
        </div>
      </section>
    </div>
  );
};

export default ExploreRoomates;
