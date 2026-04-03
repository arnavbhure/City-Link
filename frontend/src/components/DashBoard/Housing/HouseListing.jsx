import { ArrowRight, BadgeCheck, Bus, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const housingListings = [
  {
    title: "Bright PG near North Campus",
    city: "North Delhi",
    area: "Hudson Lane",
    type: "PG",
    stayValue: "Immediate",
    budgetValue: "INR 12k - 15k",
    price: "INR 13,500 / month",
    deposit: "1 month deposit",
    distance: "12 min to campus",
    setup: "Twin-sharing with study desk",
    highlight:
      "Secure building, furnished rooms, and a student-heavy area with food options nearby.",
    amenities: ["Meals included", "Wi-Fi", "Laundry support"],
  },
  {
    title: "Shared flat close to Christ University",
    city: "Koramangala, Bengaluru",
    area: "5th Block",
    type: "Shared flat",
    stayValue: "Next month",
    budgetValue: "Under INR 12k",
    price: "INR 11,200 / month",
    deposit: "Refundable security split",
    distance: "10 min by bus",
    setup: "Shared room in 2BHK",
    highlight:
      "Good for students who want a neighborhood with cafes, transit, and predictable flatmate expenses.",
    amenities: ["Wi-Fi", "Fully furnished", "Gated building"],
  },
  {
    title: "Women-only flat in Pune Central",
    city: "Pune Central",
    area: "Deccan Gymkhana",
    type: "Private room",
    stayValue: "Immediate",
    budgetValue: "INR 15k+",
    price: "INR 16,800 / month",
    deposit: "1.5 month deposit",
    distance: "15 min commute",
    setup: "Private room with attached washroom",
    highlight:
      "Quiet lane, fully furnished common spaces, and a safer setup for students moving on short notice.",
    amenities: ["Attached washroom", "Wi-Fi", "Housekeeping"],
  },
  {
    title: "Student-ready studio in Andheri East",
    city: "Andheri East, Mumbai",
    area: "Marol",
    type: "Studio",
    stayValue: "Next month",
    budgetValue: "INR 15k+",
    price: "INR 18,500 / month",
    deposit: "2 month deposit",
    distance: "Near metro access",
    setup: "Compact studio with storage",
    highlight:
      "Best for independent stays, internship-heavy schedules, and a commute that depends on metro connectivity.",
    amenities: ["Metro nearby", "Furnished", "Power backup"],
  },
  {
    title: "Managed apartment near IIT Madras",
    city: "Adyar, Chennai",
    area: "Besant Nagar Road",
    type: "Private room",
    stayValue: "This month",
    budgetValue: "INR 12k - 15k",
    price: "INR 14,400 / month",
    deposit: "1 month deposit",
    distance: "15 min by auto",
    setup: "Private room in managed flat",
    highlight:
      "Reliable utilities, calmer surroundings, and enough structure for research-heavy semesters.",
    amenities: ["Wi-Fi", "Cleaning support", "Study-friendly"],
  },
  {
    title: "Affordable 3BHK shared setup",
    city: "Gachibowli, Hyderabad",
    area: "DLF stretch",
    type: "Shared flat",
    stayValue: "This month",
    budgetValue: "Under INR 12k",
    price: "INR 10,800 / month",
    deposit: "Low deposit split",
    distance: "Quick shuttle route",
    setup: "Shared room with furnished hall",
    highlight:
      "Designed for budget-focused students who still want transit convenience and reliable basics.",
    amenities: ["Wi-Fi", "Gated access", "Fridge + kitchen"],
  },
];

const HouseListing = () => {
  return (
    <section className="rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
            Listings
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            Housing worth comparing next
          </h2>
        </div>

        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
          Showing {housingListings.length} results
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {housingListings.map((listing) => (
          <article
            key={listing.title}
            className="rounded-[1.45rem] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Student-ready
                </div>
                <h3 className="mt-4 text-2xl font-bold text-white">
                  {listing.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  {listing.type} in {listing.area}
                </p>
              </div>

              <div className="w-fit rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-indigo-200">
                {listing.price}
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3">
                <MapPin className="h-4 w-4 text-cyan-300" />
                <span>{listing.city}</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3">
                <Bus className="h-4 w-4 text-indigo-300" />
                <span>{listing.distance}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200">
                {listing.deposit}
              </span>
              <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200">
                {listing.setup}
              </span>
              <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200">
                {listing.stayValue}
              </span>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              {listing.highlight}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {listing.amenities.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-100"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
                View listing
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                to="/explore-roomates"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Find matching roommates
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HouseListing;
