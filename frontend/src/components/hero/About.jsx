import {
  ArrowRight,
  Compass,
  GraduationCap,
  House,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  {
    icon: ShieldCheck,
    eyebrow: "Trust first",
    title: "Verified spaces and people",
    description:
      "We focus on safer choices so students can avoid the uncertainty that usually comes with moving.",
  },
  {
    icon: Users,
    eyebrow: "Community led",
    title: "Matches that feel more human",
    description:
      "Roommate discovery, shared experiences, and student guidance all live in one place.",
  },
  {
    icon: House,
    eyebrow: "Everything together",
    title: "Housing, roommates, local help",
    description:
      "Instead of juggling scattered groups and listings, students can move forward with one reliable flow.",
  },
  {
    icon: GraduationCap,
    eyebrow: "Student guided",
    title: "Guidance you can trust",
    description:
      "Learn from students already in your destination city and make better decisions before you move.",
  },
];

const journeySteps = [
  {
    number: "01",
    title: "Find roommates",
    description:
      "Match with students based on preferences, lifestyle, and the kind of city move you are planning.",
  },
  {
    number: "02",
    title: "Explore housing",
    description:
      "Browse verified PGs, flats, and rentals near your campus with more confidence.",
  },
  {
    number: "03",
    title: "Settle in faster",
    description:
      "Connect with students, seniors, and useful services that make a new city feel familiar sooner.",
  },
];

const values = [
  {
    title: "Our mission",
    description:
      "To make student relocation simple, safe, and community-driven, no matter where you are moving.",
  },
  {
    title: "Our vision",
    description:
      "A world where no student feels lost in a new city, and every move begins with confidence and connection.",
  },
];

const About = () => {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem]">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-12 top-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute left-12 top-32 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <section className="relative px-6 pb-20 pt-32 sm:px-8 lg:px-10 lg:pb-24 lg:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Built for students, shaped by real moves
            </div>

            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Moving cities should feel exciting,
              <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                not chaotic.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              CityLink was created to make moving to a new city easier, safer,
              and less lonely for students everywhere. We have been there, and
              we wanted the process to feel more guided, more trusted, and a lot
              less overwhelming.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#how-citylink-works"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                See how it works
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:col-span-2">
              <div className="mb-4 flex items-center gap-3 text-indigo-300">
                <Compass className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Why CityLink exists
                </span>
              </div>
              <p className="text-xl font-semibold leading-8 text-white">
                Students need one place to find trusted housing, the right
                roommates, and a community that helps them settle in.
              </p>
            </div>

            {highlights.map(({ icon: Icon, eyebrow, title, description }) => (
              <div
                key={title}
                className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20"
              >
                <div className="mb-4 inline-flex rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  {eyebrow}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-white">
                  {title}
                </h2>
                <p className="mt-3 leading-7 text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
              The problem we faced
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white">
              New-city moves are full of guesswork.
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              Moving to a new city as a student is overwhelming. Finding a safe
              place, trustworthy roommates, and reliable services often means
              dealing with scams, random groups, and uncertainty.
            </p>
            <p className="mt-4 leading-8 text-slate-400">
              We have been there, and we knew there had to be a better way.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-400/10 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
              What we built
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white">
              A student-first platform for confident decisions.
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              CityLink brings everything students need into one platform:
              verified housing, roommate matching, and a trusted community.
            </p>
            <p className="mt-4 leading-8 text-slate-400">
              Instead of relying on scattered sources, students can make
              confident decisions backed by real people and real experiences.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm font-medium text-slate-400">
                  Safer start
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Verified housing
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm font-medium text-slate-400">
                  Better match
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Roommate discovery
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm font-medium text-slate-400">
                  Real support
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Student community
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
              Mission and vision
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              We want every move to begin with clarity and connection.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {values.map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <div className="mb-5 h-px w-16 bg-gradient-to-r from-indigo-400 to-cyan-300" />
                <h3 className="text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-4 leading-8 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-citylink-works"
        className="border-y border-white/10 bg-white/[0.03] px-6 py-20 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
                How CityLink works
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                A clearer path from searching to settling in.
              </h2>
            </div>
            <p className="max-w-xl leading-7 text-slate-400">
              The experience is designed to reduce scattered searching and help
              students move through a few simple, trusted steps.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {journeySteps.map((step) => (
              <div
                key={step.number}
                className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
                    Step {step.number}
                  </span>
                  <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-4 leading-8 text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/6 to-transparent p-8 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
              Why we started
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white">
              CityLink began with a problem we knew personally.
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              We struggled to find reliable housing and trustworthy roommates
              when moving for college. What began as a personal challenge is now
              a platform designed to help students avoid the same experience and
              move with confidence.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              What that means in practice
            </p>
            <div className="mt-6 space-y-5">
              <div className="flex gap-4">
                <div className="mt-1 rounded-full border border-indigo-400/20 bg-indigo-500/10 p-2 text-indigo-300">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    More trusted starts
                  </h3>
                  <p className="mt-1 leading-7 text-slate-400">
                    Students can avoid the random, low-trust experience that so
                    often defines their first search.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 rounded-full border border-indigo-400/20 bg-indigo-500/10 p-2 text-indigo-300">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Better connections
                  </h3>
                  <p className="mt-1 leading-7 text-slate-400">
                    Roommates, seniors, and local recommendations become part of
                    one shared student experience.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-1 rounded-full border border-indigo-400/20 bg-indigo-500/10 p-2 text-indigo-300">
                  <House className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Smarter decisions
                  </h3>
                  <p className="mt-1 leading-7 text-slate-400">
                    Students get the confidence to choose a place and community
                    that actually fits their move.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-4 sm:px-8 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-gradient-to-r from-indigo-500/15 via-white/5 to-cyan-400/10 p-8 text-center shadow-2xl shadow-black/20 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
            Ready to move with confidence?
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Join CityLink and make your next move easier, safer, and smarter.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
            Explore a student-first platform designed to bring housing,
            roommates, and community into one trusted experience.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-citylink-works"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Explore the flow
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
