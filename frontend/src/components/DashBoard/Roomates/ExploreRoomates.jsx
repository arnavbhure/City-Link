import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, GraduationCap, Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import HeroRoomateMatch from "./HeroRoomateMatch";
import gettingRoommate from "../../../api/Roommate/gettingRoommate";
import { roommateActions } from "../../../store/Roommate/roommateSlice";
import Is_Profile_Listing_completed from "./Is_Profile_Listing_completed";
import RoommateFiltering from "./RoommateFiltering";
import LoadingSpinner from "../Loading/LoadingSpinner";
import sendNotificationOnClick from "../../../api/Roommate/SendNotificationOnClick";

const initialFilters = {
  city: "Any city",
  budget: "Any budget",
  move: "Any time",
  lifestyle: "Any lifestyle",
};

const formatBudgetLabel = (minimumBudget, maximumBudget) => {
  if (minimumBudget && maximumBudget) {
    return `INR ${minimumBudget} - ${maximumBudget}`;
  }

  if (minimumBudget) {
    return `INR ${minimumBudget}+`;
  }

  if (maximumBudget) {
    return `Up to INR ${maximumBudget}`;
  }

  return "Budget not shared";
};

const getBudgetFilterValue = (minimumBudget, maximumBudget) => {
  const effectiveBudget = maximumBudget ?? minimumBudget ?? 0;

  if (effectiveBudget <= 10000) {
    return "Under INR 10k";
  }

  if (effectiveBudget <= 15000) {
    return "INR 10k - 15k";
  }

  return "INR 15k+";
};

const toTitleCase = (value) =>
  value
    ? value
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    : "";

const normalizeRoommateProfile = (profile, index) => {
  const budget = formatBudgetLabel(profile.budget_min, profile.budget_max);
  const tags = [
    `Prefers ${profile.preferred_gender} gender`,
    `${toTitleCase(profile.food_preference)} Food Preference`,
    profile.smoking_preference === "yes" || profile.smoking_preference === "any"
      ? "Prefers Smoking"
      : "No Smoking",
    profile.furnished_required ? "Needs furnished setup" : null,
    profile.wants_shared_chores ? "Open to shared chores" : null,
  ].filter(Boolean);

  return {
    id: profile.id ?? `${profile.name}-${index}`,
    name: profile.name,
    university: profile.university || "University not shared",
    course: profile.course
      ? `${profile.course}${profile.year ? `, Year ${profile.year}` : ""}`
      : "Course not shared",
    city: profile.city || profile.preferred_city || "City not shared",
    budget,
    budgetValue: getBudgetFilterValue(profile.budget_min, profile.budget_max),
    move: "Flexible",
    moveValue: "Flexible",
    lifestyle: toTitleCase(profile.lifestyle_type) || "Balanced",
    routine: toTitleCase(profile.sleep_schedule) || "Routine not shared",
    compatibility: `${Math.max(84, 96 - index)}%`,
    bio: profile.bio || "No bio shared yet.",
    tags: tags.length ? tags : ["Profile details available"],
  };
};

const ExploreRoomates = () => {
  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.user.id);

  /*for sending notification */
  const email = useSelector((state) => state.user.email);
  const senderName = useSelector((state) => state.user.full_name);
  const storedRoommates = useSelector((state) => state.roommates);
  const profile_listing_completed = useSelector(
    (state) => state.user.profile_listing_completed,
  );
  const [filters, setFilters] = useState(initialFilters);
  const [isLoadingRoommates, setIsLoadingRoommates] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [roommateError, setRoommateError] = useState("");

  useEffect(() => {
    const fetchRoommates = async () => {
      setIsLoadingRoommates(true);
      setRoommateError("");

      const response = await gettingRoommate(user_id);

      if (!response.success) {
        dispatch(roommateActions.storeRoommateList([]));
        setRoommateError(response.message);
        setIsLoadingRoommates(false);
        return;
      }

      const roommateList = Array.isArray(response.data)
        ? response.data
        : response.data
          ? [response.data]
          : [];

      dispatch(roommateActions.storeRoommateList(roommateList));
      setIsLoadingRoommates(false);
    };

    if (user_id) {
      fetchRoommates();
    }
  }, [dispatch, user_id]);

  const roommateProfilesToRender = storedRoommates.map(
    normalizeRoommateProfile,
  );

  const filteredProfiles = roommateProfilesToRender.filter((profile) => {
    const matchesBudget =
      filters.budget === "Any budget" || profile.budgetValue === filters.budget;
    const matchesMove =
      filters.move === "Any time" || profile.moveValue === filters.move;
    const matchesLifestyle =
      filters.lifestyle === "Any lifestyle" ||
      profile.lifestyle === filters.lifestyle;

    return matchesBudget && matchesMove && matchesLifestyle;
  });

  if (isLoadingRoommates || isLoading) {
    return (
      <center className="mt-40">
        <LoadingSpinner />
      </center>
    );
  }

  const handleOnSendNotification = async (profileId) => {
    try {
      setisLoading(true);
      const response = await sendNotificationOnClick({
        user_id,
        profileId,
        email,
        senderName,
      });
      setisLoading(false);
      if (response.success) {
        alert("Notification sent successfully!");
      } else {
        alert("Failed to send notification. Please try again later.");
      }
    } catch {
      setisLoading(false);
      alert("An error occurred while sending the notification.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative px-4 pb-16 pt-28 sm:px-8 sm:pb-18 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
          {/*Div for Completting profile if user not completed his profile to be listed on the roomate list  */}
          <Is_Profile_Listing_completed
            is_profile_completed={profile_listing_completed}
          />

          {/* Section for filtering the roomates on the basis of prefernces*/}
          <RoommateFiltering
            filteredProfiles={filteredProfiles}
            filters={filters}
            setFilters={setFilters}
          />
          {/*Section for displaying roomates list */}
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
                Showing {filteredProfiles.length} of{" "}
                {roommateProfilesToRender.length}
              </div>
            </div>

            {isLoadingRoommates ? (
              <div className="rounded-[1.45rem] border border-dashed border-white/15 bg-slate-950/40 px-6 py-10 text-center">
                <h3 className="text-xl font-semibold text-white">
                  Loading roommate profiles...
                </h3>
              </div>
            ) : roommateError ? (
              <div className="rounded-[1.45rem] border border-dashed border-rose-400/20 bg-rose-500/10 px-6 py-10 text-center">
                <h3 className="text-xl font-semibold text-white">
                  We could not load roommate profiles
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-rose-100/80 sm:text-base">
                  {roommateError}
                </p>
              </div>
            ) : filteredProfiles.length ? (
              <div className="grid gap-4 xl:grid-cols-2">
                {filteredProfiles.map((profile) => (
                  <article
                    key={profile.id}
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

                    <button
                      onClick={() => handleOnSendNotification(profile.id)}
                      className="hover:cursor-pointer mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Send Notification to {profile.name}
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
      <HeroRoomateMatch />
    </div>
  );
};

export default ExploreRoomates;
