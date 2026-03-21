import {
  ArrowRight,
  Bell,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Compass,
  GraduationCap,
  Heart,
  House,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const quickActions = [
  {
    icon: BriefcaseBusiness,
    title: "Post a Listing",
    description: "Share a room, flat, or PG option with students in your city.",
    accent: "from-indigo-500/25 to-cyan-400/10",
  },
  {
    icon: Search,
    title: "Browse Housing",
    description: "See spaces that fit your budget, location, and timing.",
    accent: "from-cyan-400/20 to-slate-900/10",
  },
  {
    icon: Users,
    title: "Find Roommates",
    description: "Explore people who match your lifestyle and move plans.",
    accent: "from-fuchsia-500/20 to-slate-900/10",
  },
];

const moveSignals = [
  {
    label: "Where you are",
    value: "Shortlisting options",
  },
  {
    label: "What to do next",
    value: "Complete your profile",
  },
  {
    label: "Options right now",
    value: "4 roommate matches, 3 listings",
  },
];

const roommates = [
  {
    name: "Riya Sharma",
    college: "Delhi University",
    budget: "INR 12k - 15k",
    bio: "Early riser, neat space, looking for a quiet flat near North Campus.",
  },
  {
    name: "Kabir Mehta",
    college: "Amity University",
    budget: "INR 10k - 13k",
    bio: "Works part-time, prefers a furnished room, and values shared routines.",
  },
  {
    name: "Aanya Verma",
    college: "Christ University",
    budget: "INR 14k - 18k",
    bio: "Moving in next month and wants a safe place close to public transport.",
  },
  {
    name: "Ishaan Patel",
    college: "Symbiosis",
    budget: "INR 11k - 14k",
    bio: "Looking for a roommate who is social, tidy, and comfortable with guests.",
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
  "2 saved listings ready to compare",
  "1 roommate profile shortlisted",
];

const updates = [
  "2 new listings in Bengaluru match your budget.",
  "1 student viewed your profile in the last 24 hours.",
];

const profile = {
  name: "Arnav",
  city: "Bengaluru",
  budget: "INR 12k - 15k",
  preferences: "Near campus, furnished, quiet roommates",
  completion: 60,
};

const DashBoard = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute left-0 top-48 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <section className="relative px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-4xl border border-white/10 bg-black/20 p-3 backdrop-blur-xl">
            <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
              <aside className="rounded-[1.6rem] border border-white/10 bg-slate-900/80 p-5">
                <div className="rounded-[1.4rem] border border-white/10 bg-gradient-to-br from-indigo-500/20 via-white/5 to-cyan-400/10 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
                    CityLink
                  </p>
                  <h2 className="mt-4 text-2xl font-bold text-white">
                    Move Dashboard
                  </h2>
                  <p className="mt-3 leading-7 text-slate-300">
                    A focused view of people, places, and next steps.
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-3 text-sm font-semibold text-white">
                    Dashboard overview
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                    Roommate matches
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                    Housing listings
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                    Saved progress
                  </div>
                </div>

                <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full border border-white/10 bg-slate-950 p-2 text-indigo-300">
                      <CircleUserRound className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{profile.name}</p>
                      <p className="text-sm text-slate-400">{profile.city}</p>
                    </div>
                  </div>
                  <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition hover:text-indigo-200">
                    Edit profile
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </aside>

              <main className="space-y-6 rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-4 sm:p-5">
                <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                  <section className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/8 via-transparent to-transparent p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300">
                        <Sparkles className="h-4 w-4" />
                        Student move in progress
                      </div>
                    </div>

                    <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
                      Welcome back, Arnav
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                      Let&apos;s get you closer to your perfect place.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                      {moveSignals.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
                        >
                          <p className="text-sm text-slate-400">{item.label}</p>
                          <p className="mt-2 text-lg font-semibold text-white">
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-indigo-500/15 via-white/5 to-cyan-400/10 p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
                          Profile completion
                        </p>
                        <h2 className="mt-3 text-4xl font-black text-white">
                          {profile.completion}%
                        </h2>
                      </div>
                      <div className="rounded-full border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
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
                      Complete a few more profile details so CityLink can show
                      stronger roommate and housing matches.
                    </p>

                    <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200">
                      Complete now
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </section>
                </div>

                <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 sm:p-8">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
                        Quick actions
                      </p>
                      <h2 className="mt-3 text-3xl font-bold text-white">
                        Take action immediately
                      </h2>
                    </div>
                    <Compass className="hidden h-6 w-6 text-indigo-300 sm:block" />
                  </div>

                  <div className="grid gap-4 lg:grid-cols-3">
                    {quickActions.map(
                      ({ icon: Icon, title, description, accent }) => (
                        <button
                          key={title}
                          className={`rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${accent} p-6 text-left transition hover:border-indigo-400/30 hover:translate-y-[-2px]`}
                        >
                          <div className="mb-6 inline-flex rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-indigo-300">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="text-2xl font-semibold text-white">
                            {title}
                          </h3>
                          <p className="mt-3 leading-7 text-slate-300">
                            {description}
                          </p>
                        </button>
                      ),
                    )}
                  </div>
                </section>

                <div className="grid gap-6 2xl:grid-cols-[1.05fr_0.95fr]">
                  <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 sm:p-8">
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
                          Suggested roommates
                        </p>
                        <h2 className="mt-3 text-3xl font-bold text-white">
                          People you can connect with now
                        </h2>
                      </div>
                      <Users className="hidden h-6 w-6 text-indigo-300 sm:block" />
                    </div>

                    <div className="grid gap-4 xl:grid-cols-2">
                      {roommates.map((roommate) => (
                        <div
                          key={roommate.name}
                          className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5"
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

                          <div className="mt-5 flex gap-3">
                            <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
                              View Profile
                            </button>
                            <button className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                              Connect
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <div className="space-y-6">
                    <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 sm:p-8">
                      <div className="mb-5 flex items-center gap-3 text-indigo-300">
                        <Bell className="h-5 w-5" />
                        <span className="text-sm font-semibold uppercase tracking-[0.25em]">
                          Updates
                        </span>
                      </div>

                      <div className="space-y-4">
                        {updates.map((item) => (
                          <div
                            key={item}
                            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/6 to-transparent p-6 sm:p-8">
                      <div className="mb-5 flex items-center gap-3 text-indigo-300">
                        <CircleUserRound className="h-5 w-5" />
                        <span className="text-sm font-semibold uppercase tracking-[0.25em]">
                          Profile summary
                        </span>
                      </div>

                      <div className="grid gap-4 text-slate-300">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <p className="text-sm text-slate-400">Name</p>
                          <p className="mt-1 font-semibold text-white">
                            {profile.name}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <p className="text-sm text-slate-400">City</p>
                          <p className="mt-1 font-semibold text-white">
                            {profile.city}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <p className="text-sm text-slate-400">Budget</p>
                          <p className="mt-1 font-semibold text-white">
                            {profile.budget}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <p className="text-sm text-slate-400">Preferences</p>
                          <p className="mt-1 font-semibold text-white">
                            {profile.preferences}
                          </p>
                        </div>
                      </div>

                      <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
                        Edit Profile
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </section>
                  </div>
                </div>

                <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 sm:p-8">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
                        Recommended listings
                      </p>
                      <h2 className="mt-3 text-3xl font-bold text-white">
                        Places you can review right now
                      </h2>
                    </div>
                    <Building2 className="hidden h-6 w-6 text-indigo-300 sm:block" />
                  </div>

                  <div className="grid gap-4 xl:grid-cols-3">
                    {listings.map((listing) => (
                      <div
                        key={listing.title}
                        className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white">
                              {listing.title}
                            </h3>
                            <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
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

                        <div className="mt-5 flex gap-3">
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

                <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
                  <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6 sm:p-8">
                    <div className="mb-6 flex items-center gap-3 text-indigo-300">
                      <Heart className="h-5 w-5" />
                      <span className="text-sm font-semibold uppercase tracking-[0.25em]">
                        Saved and shortlisted
                      </span>
                    </div>

                    <div className="space-y-4">
                      {savedItems.map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-[1.75rem] border border-white/10 bg-gradient-to-r from-indigo-500/15 via-white/5 to-cyan-400/10 p-6 shadow-2xl shadow-black/20 sm:p-8">
                    <div className="mb-5 flex items-center gap-3 text-indigo-300">
                      <Clock3 className="h-5 w-5" />
                      <span className="text-sm font-semibold uppercase tracking-[0.25em]">
                        Why this feels useful
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold text-white">
                      You log in and instantly see your move stage, next action,
                      and available options.
                    </h2>
                    <p className="mt-4 max-w-3xl leading-8 text-slate-300">
                      This is still UI-first with static data, but it already
                      behaves like a product dashboard instead of a decorative
                      page because the student can act on roommates, listings,
                      saved progress, and profile completion right away.
                    </p>
                  </section>
                </div>
              </main>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
