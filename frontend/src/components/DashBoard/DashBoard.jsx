import { createElement } from "react";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  MapPin,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

const profile = {
  name: "Arnav",
};

const primaryActions = [
  {
    icon: Users,
    title: "Find roommates",
    description:
      "See students with similar budgets, routines, and move timelines.",
    cta: "Explore matches",
    accent: "bg-gradient-to-br from-indigo-500/18 via-white/5 to-cyan-400/10",
  },
  {
    icon: Search,
    title: "Browse housing",
    description: "Open PGs, rooms, and flats that match your city and budget.",
    cta: "See housing",
    accent: "bg-gradient-to-br from-slate-900/80 via-white/5 to-indigo-500/10",
  },
  {
    icon: Building2,
    title: "Post a listing",
    description:
      "Publish an available room or flat and start getting responses fast.",
    cta: "Create listing",
    accent: "bg-gradient-to-br from-slate-900/80 via-white/5 to-fuchsia-500/10",
  },
];

const feedItems = [
  {
    type: "Roommate",
    title: "Riya Sharma",
    detail: "INR 12k - 15k",
    meta: "Delhi University",
    description:
      "Early riser, tidy space, and looking for a quiet flat near campus.",
    cta: "View profile",
    metaIcon: GraduationCap,
  },
  {
    type: "Listing",
    title: "Bright PG near North Campus",
    detail: "INR 13,500 / month",
    meta: "North Delhi",
    description:
      "Furnished PG with a quick commute, secure entry, and move-in this month.",
    cta: "View listing",
    metaIcon: MapPin,
  },
  {
    type: "Roommate",
    title: "Kabir Mehta",
    detail: "INR 10k - 13k",
    meta: "Amity University",
    description:
      "Prefers a furnished place and a predictable shared routine near transit.",
    cta: "View profile",
    metaIcon: GraduationCap,
  },
  {
    type: "Listing",
    title: "2BHK flat with shared room",
    detail: "INR 11,000 / month",
    meta: "Koramangala, Bengaluru",
    description:
      "Shared-room option in a furnished flat with easy access to campus routes.",
    cta: "View listing",
    metaIcon: MapPin,
  },
  {
    type: "Roommate",
    title: "Aanya Verma",
    detail: "INR 14k - 18k",
    meta: "Christ University",
    description:
      "Moving next month and wants a safe area close to public transport.",
    cta: "View profile",
    metaIcon: GraduationCap,
  },
  {
    type: "Listing",
    title: "Roommate opening in furnished flat",
    detail: "INR 12,800 / month",
    meta: "Pune Central",
    description:
      "Private storage, furnished common areas, and flexible move timing.",
    cta: "View listing",
    metaIcon: MapPin,
  },
];

const ActionCard = ({ icon: Icon, title, description, cta, accent }) => {
  return (
    <button
      className={`group flex min-h-[220px] flex-col rounded-[1.8rem] border border-white/10 ${accent} p-6 text-left backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-white/20 sm:p-7`}
    >
      <div className="inline-flex w-fit rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-indigo-300">
        {createElement(Icon, { className: "h-5 w-5" })}
      </div>

      <div className="mt-10 space-y-4">
        <h2 className="text-2xl font-bold text-white sm:text-[1.7rem]">
          {title}
        </h2>
        <p className="max-w-xs text-base leading-7 text-slate-300">
          {description}
        </p>
      </div>

      <div className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-white">
        {cta}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </button>
  );
};

const FeedCard = ({
  type,
  title,
  detail,
  meta,
  description,
  cta,
  metaIcon: MetaIcon,
}) => {
  return (
    <article className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/[0.07]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-indigo-300">
            {type}
          </span>
          <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
          <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
            {createElement(MetaIcon, { className: "h-4 w-4" })}
            <span>{meta}</span>
          </div>
        </div>

        <div className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200">
          {detail}
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p>

      <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
        {cta}
        <ArrowRight className="h-4 w-4" />
      </button>
    </article>
  );
};

const DashBoard = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-104">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/18 blur-3xl" />
        <div className="absolute left-8 top-28 h-56 w-56 rounded-full bg-cyan-400/8 blur-3xl" />
        <div className="absolute right-10 top-24 h-64 w-64 rounded-full bg-fuchsia-500/8 blur-3xl" />
      </div>

      <section className="relative px-6 pb-16 pt-32 sm:px-8 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 backdrop-blur-sm sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300">
              <Sparkles className="h-4 w-4" />
              CityLink dashboard
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Welcome back,{" "}
              <span className="text-indigo-300">{profile.name}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Pick one action and move closer to your next room today.
            </p>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-300">
                  Primary actions
                </p>
                <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                  Start here
                </h2>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {primaryActions.map((action) => (
                <ActionCard key={action.title} {...action} />
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-300">
                  Discover now
                </p>
                <h2 className="mt-3 text-2xl font-bold text-white">
                  One feed for people and places worth opening next
                </h2>
              </div>

              <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 sm:block">
                Roommates + housing
              </div>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              {feedItems.map((item) => (
                <FeedCard key={`${item.type}-${item.title}`} {...item} />
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
