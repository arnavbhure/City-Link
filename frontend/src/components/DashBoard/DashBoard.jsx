import {
  ArrowRight,
  Bell,
  Bookmark,
  Building2,
  CircleUserRound,
  GraduationCap,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const overviewCards = [
  {
    label: "Move stage",
    value: "Shortlisting places",
  },
  {
    label: "Next priority",
    value: "Complete profile details",
  },
  {
    label: "Available now",
    value: "3 roommate matches and 3 listings",
  },
];

const quickActions = [
  {
    icon: Building2,
    title: "Post a listing",
    description: "Share a room, flat, or PG option for other students.",
  },
  {
    icon: Search,
    title: "Browse housing",
    description: "Review places that match your city, budget, and move timing.",
  },
  {
    icon: Users,
    title: "Find roommates",
    description: "See people with similar budgets, routines, and preferences.",
  },
];

const roommates = [
  {
    name: "Riya Sharma",
    college: "Delhi University",
    budget: "INR 12k - 15k",
    bio: "Early riser, tidy space, and looking for a quiet flat near campus.",
  },
  {
    name: "Kabir Mehta",
    college: "Amity University",
    budget: "INR 10k - 13k",
    bio: "Prefers a furnished room and a predictable shared routine.",
  },
  {
    name: "Aanya Verma",
    college: "Christ University",
    budget: "INR 14k - 18k",
    bio: "Moving next month and wants a safe area close to public transport.",
  },
];

const listings = [
  {
    title: "Bright PG near North Campus",
    price: "INR 13,500 / month",
    location: "North Delhi",
    type: "PG",
  },
  {
    title: "2BHK flat with shared room",
    price: "INR 11,000 / month",
    location: "Koramangala, Bengaluru",
    type: "Flat",
  },
  {
    title: "Roommate opening in furnished flat",
    price: "INR 12,800 / month",
    location: "Pune Central",
    type: "Roommate",
  },
];

const savedItems = [
  "2 listings saved for comparison",
  "1 roommate profile shortlisted",
  "1 area preference locked for alerts",
];

const updates = [
  "2 new listings in Bengaluru match your budget.",
  "1 student viewed your profile in the last 24 hours.",
  "Your saved PG search has 3 fresh results this week.",
];

const profile = {
  name: "Arnav",
  city: "Bengaluru",
  budget: "INR 12k - 15k",
  preferences: "Furnished, near campus, quieter roommates",
  completion: 68,
};

const DashBoard = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[26rem]">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/18 blur-3xl" />
        <div className="absolute left-8 top-28 h-56 w-56 rounded-full bg-cyan-400/8 blur-3xl" />
        <div className="absolute right-10 top-24 h-64 w-64 rounded-full bg-fuchsia-500/8 blur-3xl" />
      </div>

      <section className="relative px-6 pb-16 pt-32 sm:px-8 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur-sm sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300">
                <Sparkles className="h-4 w-4" />
                Student move dashboard
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Welcome back, {profile.name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Let&apos;s get you closer to the right place with clear next
                steps, active matches, and housing you can review now.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {overviewCards.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                  >
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-300">
                    Profile completion
                  </p>
                  <h2 className="mt-3 text-4xl font-black text-white">
                    {profile.completion}%
                  </h2>
                </div>
                <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
                  <ShieldCheck className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300"
                  style={{ width: `${profile.completion}%` }}
                />
              </div>

              <p className="mt-5 leading-7 text-slate-300">
                Add a few more details like your move month, preferred area, and
                lifestyle so CityLink can improve your recommendations.
              </p>

              <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200">
                Complete profile
                <ArrowRight className="h-4 w-4" />
              </button>
            </section>
          </div>

          <section className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-300">
                  Quick actions
                </p>
                <h2 className="mt-3 text-2xl font-bold text-white">
                  Start with the action you need most
                </h2>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {quickActions.map(({ icon: Icon, title, description }) => (
                <button
                  key={title}
                  className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10"
                >
                  <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-indigo-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-400">{description}</p>
                </button>
              ))}
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-2">
            <section className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm sm:p-8">
              <div className="mb-6 flex items-center gap-3 text-indigo-300">
                <Users className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.24em]">
                  Suggested roommates
                </span>
              </div>

              <div className="space-y-4">
                {roommates.map((roommate) => (
                  <div
                    key={roommate.name}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {roommate.name}
                        </h3>
                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                          <GraduationCap className="h-4 w-4" />
                          {roommate.college}
                        </div>
                      </div>
                      <div className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-300">
                        {roommate.budget}
                      </div>
                    </div>

                    <p className="mt-4 leading-7 text-slate-400">
                      {roommate.bio}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
                        View profile
                      </button>
                      <button className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                        Connect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm sm:p-8">
              <div className="mb-6 flex items-center gap-3 text-indigo-300">
                <Building2 className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.24em]">
                  Recommended listings
                </span>
              </div>

              <div className="space-y-4">
                {listings.map((listing) => (
                  <div
                    key={listing.title}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {listing.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                          <MapPin className="h-4 w-4" />
                          {listing.location}
                        </div>
                      </div>
                      <div className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-300">
                        {listing.type}
                      </div>
                    </div>

                    <p className="mt-4 text-lg font-semibold text-white">
                      {listing.price}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
                        View
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                        <Bookmark className="h-4 w-4" />
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm sm:p-8">
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <div className="mb-4 flex items-center gap-3 text-indigo-300">
                    <Bookmark className="h-5 w-5" />
                    <span className="text-sm font-semibold uppercase tracking-[0.24em]">
                      Saved
                    </span>
                  </div>

                  <div className="space-y-3">
                    {savedItems.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-center gap-3 text-indigo-300">
                    <Bell className="h-5 w-5" />
                    <span className="text-sm font-semibold uppercase tracking-[0.24em]">
                      Updates
                    </span>
                  </div>

                  <div className="space-y-3">
                    {updates.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
              <div className="mb-6 flex items-center gap-3 text-indigo-300">
                <CircleUserRound className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.24em]">
                  Profile summary
                </span>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-sm text-slate-400">Name</p>
                  <p className="mt-1 font-semibold text-white">
                    {profile.name}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-sm text-slate-400">City</p>
                  <p className="mt-1 font-semibold text-white">
                    {profile.city}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-sm text-slate-400">Budget</p>
                  <p className="mt-1 font-semibold text-white">
                    {profile.budget}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="text-sm text-slate-400">Preferences</p>
                  <p className="mt-1 font-semibold text-white">
                    {profile.preferences}
                  </p>
                </div>
              </div>

              <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
                Edit profile
                <ArrowRight className="h-4 w-4" />
              </button>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
