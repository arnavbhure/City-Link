import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Home,
  MapPin,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Loading/LoadingSpinner";
import getHouseListings from "../../../api/getHouseListings/getHouseListings";
import ErrorMessage from "../../ErrorMessage";
import { useSelector } from "react-redux";

const propertyTypeOptions = [
  { label: "All", value: "all" },
  { label: "PG", value: "pg" },
  { label: "Flat", value: "flat" },
  { label: "Room", value: "room" },
];

const propertyTypeLabelMap = {
  pg: "PG",
  flat: "Flat",
  room: "Room",
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);

const HouseListing = () => {
  const userCity = useSelector((state) => state.user.city);
  const [housingListings, setHousingListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        const response = await getHouseListings(userCity);
        if (response.success) {
          setHousingListings(response.data);
        } else {
          setIsError(true);
          setFetchError(
            response.message || "An error occurred while fetching listings",
          );
        }
      } catch {
        setIsError(true);
        setFetchError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchListings();
  }, []);

  const [housingError, setHousingError] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("all");
  const [showFurnishedOnly, setShowFurnishedOnly] = useState(false);

  const filteredListings = housingListings.filter((listing) => {
    const matchesPropertyType =
      selectedPropertyType === "all" ||
      listing.property_type === selectedPropertyType;
    const matchesFurnished = !showFurnishedOnly || listing.is_furnished;

    return matchesPropertyType && matchesFurnished;
  });

  if (isError) {
    return (
      <>
        <ErrorMessage error={fetchError} />
      </>
    );
  }

  return (
    <section className="rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
              Listings
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Housing worth comparing next
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              The feed now reads from your listings, features, and
              listing_features tables, with every published card showing real
              rent, locality, sharing setup, availability, furnishing, and
              amenities.
            </p>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            Showing {filteredListings.length} of {housingListings.length}
          </div>
        </div>

        <section className="grid gap-4 rounded-[1.45rem] border border-white/10 bg-slate-950/45 p-4 lg:grid-cols-[1.3fr_0.85fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Property type
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {propertyTypeOptions.map((option) => {
                const isActive = selectedPropertyType === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedPropertyType(option.value)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-white text-slate-950"
                        : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Setup
            </p>
            <button
              type="button"
              onClick={() => setShowFurnishedOnly((current) => !current)}
              className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                showFurnishedOnly
                  ? "bg-emerald-400 text-slate-950"
                  : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              {showFurnishedOnly ? "Furnished only" : "Show all setups"}
            </button>
          </div>
        </section>

        {isLoading ? (
          <div className="flex min-h-72 items-center justify-center rounded-[1.45rem] border border-white/10 bg-slate-950/40 px-6 py-10">
            <LoadingSpinner />
          </div>
        ) : housingError ? (
          <div className="rounded-[1.45rem] border border-dashed border-rose-400/20 bg-rose-500/10 px-6 py-10 text-center">
            <h3 className="text-xl font-semibold text-white">
              We could not load housing listings
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-rose-100/80 sm:text-base">
              {housingError}
            </p>
          </div>
        ) : filteredListings.length ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredListings.map((listing) => {
              const featureTags = [
                ...(Array.isArray(listing.features) ? listing.features : []),
                listing.is_furnished ? "Fully furnished" : null,
              ].filter(Boolean);

              return (
                <article
                  key={listing.id}
                  className="rounded-[1.45rem] border border-white/10 bg-linear-to-br from-white/[0.08] to-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.09] sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        {listing.tag}
                      </div>

                      <h3 className="mt-4 text-2xl font-bold text-white">
                        {listing.title}
                      </h3>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-300">
                        <span className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1">
                          {propertyTypeLabelMap[listing.property_type] ||
                            "Property"}
                        </span>
                        <span className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1">
                          {listing.sharing_type}
                        </span>
                        <span className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1">
                          {listing.is_furnished ? "Furnished" : "Unfurnished"}
                        </span>
                      </div>
                    </div>

                    <div className="w-fit rounded-3xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-3 text-right">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-200">
                        Monthly rent
                      </p>
                      <p className="mt-1 text-lg font-bold text-white">
                        {formatCurrency(listing.rent)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3">
                      <MapPin className="h-4 w-4 text-cyan-300" />
                      <span>
                        {listing.locality}, {listing.city}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3">
                      <CalendarDays className="h-4 w-4 text-indigo-300" />
                      <span>{listing.available_from}</span>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Wallet className="h-4 w-4 text-indigo-300" />
                        <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                          Deposit
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-white">
                        {formatCurrency(listing.deposit)}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Home className="h-4 w-4 text-cyan-300" />
                        <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                          Type
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-white">
                        {propertyTypeLabelMap[listing.property_type] ||
                          "Property"}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Sparkles className="h-4 w-4 text-emerald-300" />
                        <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                          Host
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-white">
                        {listing.owner_name || "Verified host"}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-300">
                    {listing.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {(featureTags.length
                      ? featureTags
                      : ["No amenities added yet"]
                    ).map((feature) => (
                      <span
                        key={`${listing.id}-${feature}`}
                        className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-100"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <div className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">
                      <Wallet className="h-4 w-4" />
                      Posted by {listing.owner_name || "verified host"}
                    </div>

                    <Link
                      to="/dashboard/explore-roomates"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Find matching roommates
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[1.45rem] border border-dashed border-white/15 bg-slate-950/40 px-6 py-12 text-center">
            <h3 className="text-xl font-semibold text-white">
              No listings match these filters yet
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Try switching the property type or furnished filter to bring more
              housing cards back into view.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedPropertyType("all");
                setShowFurnishedOnly(false);
              }}
              className="hover:cursor-pointer mt-6 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HouseListing;
