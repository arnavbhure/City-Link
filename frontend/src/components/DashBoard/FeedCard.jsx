import { ArrowRight, GraduationCap, MapPin } from "lucide-react";
import { createElement } from "react";
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

const FeedCardsDisplay = () => {
  return (
    <>
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
    </>
  );
};

export default FeedCardsDisplay;
