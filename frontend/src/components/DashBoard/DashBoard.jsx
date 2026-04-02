import { createElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  MapPin,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import loadUserInfo from "../../utils/loadUserInfo";
import { userInfoActions } from "../../store/user/userSlice";

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
      className={`group flex min-h-[190px] flex-col rounded-[1.55rem] border border-white/10 ${accent} p-5 text-left backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-white/20 sm:min-h-[220px] sm:rounded-[1.8rem] sm:p-7`}
    >
      <div className="inline-flex w-fit rounded-[1rem] border border-white/10 bg-slate-950/70 p-2.5 text-indigo-300 sm:rounded-2xl sm:p-3">
        {createElement(Icon, { className: "h-4.5 w-4.5 sm:h-5 sm:w-5" })}
      </div>

      <div className="mt-7 space-y-3 sm:mt-10 sm:space-y-4">
        <h2 className="text-[1.7rem] font-bold text-white sm:text-[1.7rem]">
          {title}
        </h2>
        <p className="max-w-sm text-[0.95rem] leading-6 text-slate-300 sm:max-w-xs sm:text-base sm:leading-7">
          {description}
        </p>
      </div>

      <div className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-white sm:pt-8">
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
    <article className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/[0.07] sm:rounded-[1.6rem] sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div>
          <span className="inline-flex rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-indigo-300 sm:text-xs">
            {type}
          </span>
          <h3 className="mt-3 text-lg font-semibold leading-tight text-white sm:mt-4 sm:text-xl">
            {title}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-400 sm:mt-3">
            {createElement(MetaIcon, { className: "h-4 w-4 shrink-0" })}
            <span>{meta}</span>
          </div>
        </div>

        <div className="w-fit rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-[11px] font-medium text-slate-200 sm:text-xs">
          {detail}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-300 sm:leading-7">
        {description}
      </p>

      <button className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:mt-6">
        {cta}
        <ArrowRight className="h-4 w-4" />
      </button>
    </article>
  );
};

const DashBoard = () => {
  const dispatch = useDispatch();
  // useEffect for getting user info after user refreshes page
  useEffect(() => {
    const fetchUser = async () => {
      const user = await loadUserInfo();
      if (user) {
        dispatch(userInfoActions.storeUserInfo(user));
      }
    };
    fetchUser();
  }, [dispatch]);
  const user = useSelector((state) => state.user);
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-104">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/18 blur-3xl" />
        <div className="absolute left-8 top-28 h-56 w-56 rounded-full bg-cyan-400/8 blur-3xl" />
        <div className="absolute right-10 top-24 h-64 w-64 rounded-full bg-fuchsia-500/8 blur-3xl" />
      </div>

      <section className="relative px-4 pb-14 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-7xl space-y-5 sm:space-y-8">
          <section className="rounded-[1.6rem] border border-white/10 bg-slate-900/70 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300">
              <Sparkles className="h-4 w-4" />
              CityLink dashboard
            </div>

            <h1 className="mt-5 text-[2.1rem] font-black leading-none tracking-tight text-white sm:mt-6 sm:text-5xl">
              Welcome back,{" "}
              <span className="text-indigo-300">{user.full_name}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Pick one action and move closer to your next room today.
            </p>
          </section>

          <section className="rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-4 sm:mb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
                  Primary actions
                </p>
                <h2 className="mt-2 text-[2rem] font-black text-white sm:mt-3 sm:text-4xl">
                  Start here
                </h2>
              </div>
            </div>

            <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
              {primaryActions.map((action) => (
                <ActionCard key={action.title} {...action} />
              ))}
            </div>
          </section>

          <section className="rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
            <div className="mb-5 flex items-start justify-between gap-4 sm:mb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
                  Discover now
                </p>
                <h2 className="mt-2 text-xl font-bold leading-tight text-white sm:mt-3 sm:text-2xl">
                  One feed for people and places worth opening next
                </h2>
              </div>

              <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 sm:block">
                Roommates + housing
              </div>
            </div>

            <div className="grid gap-3 sm:gap-4 xl:grid-cols-2">
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
