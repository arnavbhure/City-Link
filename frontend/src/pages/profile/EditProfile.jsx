import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BedDouble,
  CookingPot,
  GraduationCap,
  MapPin,
  MoonStar,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import EditProfileHeader from "../../components/profileEdit/EditProfileHeader";
import EditProfileSection from "../../components/profileEdit/EditProfileSection";
import LockedField from "../../components/profileEdit/LockedField";
import EditableInput from "../../components/profileEdit/EditableInput";
import PreferenceToggle from "../../components/profileEdit/PreferenceToggle";
import BudgetRangeInput from "../../components/profileEdit/BudgetRangeInput";
import ProfileTextarea from "../../components/profileEdit/ProfileTextarea";
import SaveProfileButton from "../../components/profileEdit/SaveProfileButton";
import SectionDivider from "../../components/profileEdit/SectionDivider";
import LifestyleSelector from "../../components/profileEdit/LifestyleSelector";
import LifestyleTypeSelector from "../../components/profileEdit/selectors/LifestyleTypeSelector";
import SleepScheduleSelector from "../../components/profileEdit/selectors/SleepScheduleSelector";
import CleanlinessSelector from "../../components/profileEdit/selectors/CleanlinessSelector";
import {
  academicYearOptions,
  foodPreferenceOptions,
  preferredGenderOptions,
  smokingPreferenceOptions,
} from "../../components/profileEdit/data";
import {
  buildAcademicSummary,
  buildBudgetSummary,
  buildLifestyleSummary,
  buildPreviewLine,
  createInitialProfileDraft,
  hasValue,
  humanizeValue,
} from "../../components/profileEdit/utils";
import { pageBackdrop, pageShell } from "../../components/profileEdit/styles";
import { userInfoActions } from "../../store/user/userSlice";
import getEditProfileData from "../../api/EditProfile/getEditProfileData";
import LoadingSpinner from "../../components/DashBoard/Loading/LoadingSpinner";
import saveChangesEditProfile from "../../api/EditProfile/saveChangesEditProfile";

const sectionLinks = [
  { id: "account", label: "Account" },
  { id: "academic", label: "Academic" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "preferences", label: "Preferences" },
  { id: "save", label: "Save" },
];

const getPreferredGenderLabel = (value) => {
  if (value === "male") {
    return "Male";
  }

  if (value === "female") {
    return "Female";
  }

  return "Any";
};

const getFoodPreferenceLabel = (value) => {
  if (value === "veg") {
    return "Vegetarian";
  }

  if (value === "non-veg") {
    return "Non-veg";
  }

  return "Any";
};

const buildSnapshotItems = (draft) => [
  {
    label: "Academic base",
    value: buildAcademicSummary(draft),
    icon: GraduationCap,
  },
  {
    label: "Lifestyle",
    value: buildLifestyleSummary(draft),
    icon: MoonStar,
  },
  {
    label: "Budget",
    value: buildBudgetSummary(draft.budget_min, draft.budget_max),
    icon: Wallet,
  },
  {
    label: "Kitchen vibe",
    value: getFoodPreferenceLabel(draft.food_preference),
    icon: CookingPot,
  },
  {
    label: "Roommate fit",
    value: [
      getPreferredGenderLabel(draft.preferred_gender),
      draft.smoking_preference === "no"
        ? "Non-smoking"
        : draft.smoking_preference === "yes"
          ? "Smoking okay"
          : humanizeValue(draft.smoking_preference),
    ].join(" · "),
    icon: Users,
  },
];

const EditProfile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getuserProfile = async () => {
      try {
        setLoading(true);
        const response = await getEditProfileData();
        if (response.success) {
          dispatch(userInfoActions.storeUserInfo(response.data));
        }
      } catch (err) {
        console.error("Error in getting user profile . ", err);
      } finally {
        setLoading(false);
      }
    };

    getuserProfile();
  }, [dispatch]);

  const user = useSelector((state) => state.user);
  const [draft, setDraft] = useState(() => createInitialProfileDraft(user));

  // to sync the user state with the the newly fetched user data from db
  useEffect(() => {
    setDraft(createInitialProfileDraft(user));
  }, [user]);

  const [savedDraft, setSavedDraft] = useState(() =>
    createInitialProfileDraft(user),
  );
  const [error, setError] = useState("");
  const [saveState, setSaveState] = useState("idle");
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const hydrationRef = useRef(false);
  const saveTimerRef = useRef(null);

  useEffect(() => {
    if (hydrationRef.current) {
      return;
    }

    const hasUserData = Boolean(
      user &&
      (user.id ||
        user.email ||
        user.full_name ||
        user.city ||
        user.college ||
        user.university ||
        user.course ||
        user.clg_year ||
        user.year ||
        typeof user.profile_listing_completed !== "undefined"),
    );

    if (!hasUserData) {
      return;
    }

    const initialDraft = createInitialProfileDraft(user);
    setDraft(initialDraft);
    setSavedDraft(initialDraft);
    hydrationRef.current = true;
  }, [user]);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  const handleFieldChange = (field, value) => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }

    setDraft((current) => ({
      ...current,
      [field]: value,
    }));

    setSaveState("idle");
  };

  const budgetInvalid =
    hasValue(draft.budget_min) &&
    hasValue(draft.budget_max) &&
    Number(draft.budget_min) > Number(draft.budget_max);

  const hasChanges = JSON.stringify(draft) !== JSON.stringify(savedDraft);
  const profileName = draft.full_name || user.full_name || "Your profile";

  // for submitting the draft to save to db
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (budgetInvalid || saveState === "saving" || !hasChanges) {
      return;
    }

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }

    try {
      setSaveState("saving");
      const response = await saveChangesEditProfile(draft);
      if (!response.success) {
        setSaveState("idle");
        setError(
          response.message ||
            "Failed to edit your profile. Please try again later.",
        );
        return;
      }

      setSavedDraft(draft);
      setLastSavedAt(new Date());
      setSaveState("saved");
      saveTimerRef.current = setTimeout(() => {
        setSaveState("idle");
      }, 2000);
    } catch (err) {
      console.error("Error in saving your profile.", err);

      setError("Something went wrong while saving profile.");

      setSaveState("idle");
    }
  };

  const handleReset = () => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }

    setDraft(savedDraft);
    setSaveState("idle");
  };

  //for loading hash spinner when data is fetched from db or when data is to be saved to db
  if (loading) {
    return (
      <div className="mt-45">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className={pageShell}>
      <div className={pageBackdrop} />

      <section className="relative px-4 pb-36 pt-28 sm:px-6 sm:pb-40 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="pointer-events-none absolute left-[-12%] top-8 h-80 w-80 rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="pointer-events-none absolute right-[-10%] top-24 h-96 w-96 rounded-full bg-indigo-500/14 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-10%] left-1/3 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <EditProfileHeader
            fullName={draft.full_name || user.full_name}
            email={draft.email || user.email}
            isDirty={hasChanges}
            saveState={saveState}
            lastSavedAt={lastSavedAt}
            sections={sectionLinks}
          />

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_24rem] lg:items-start">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <EditProfileSection
                id="account"
                eyebrow="Account information"
                title="Locked identity details"
                description="These fields stay visible so the profile feels trustworthy, but they are intentionally not editable."
                accent="from-cyan-400/75 via-sky-300/30 to-transparent"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <LockedField
                    label="Full name"
                    value={draft.full_name || user.full_name}
                  />
                  <LockedField
                    label="Email address"
                    value={draft.email || user.email}
                  />
                </div>
              </EditProfileSection>

              <EditProfileSection
                id="academic"
                eyebrow="Academic information"
                title="Where you study and how you move"
                description="Keep the public context around your college life clear so the right people can find you faster."
                accent="from-sky-400/75 via-indigo-300/25 to-transparent"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <EditableInput
                    label="City"
                    helper="The city you are currently based in."
                    name="city"
                    value={draft.city}
                    onChange={(event) =>
                      handleFieldChange("city", event.target.value)
                    }
                    placeholder="Mumbai, Pune, Bengaluru..."
                    autoComplete="address-level2"
                  />

                  <EditableInput
                    label="Study year"
                    helper="Use the year that best reflects your current course stage."
                    name="clg_year"
                    as="select"
                    options={academicYearOptions}
                    value={draft.clg_year}
                    onChange={(event) =>
                      handleFieldChange("clg_year", event.target.value)
                    }
                  />

                  <EditableInput
                    label="College"
                    helper="Your institution or university name."
                    name="college"
                    value={draft.college}
                    onChange={(event) =>
                      handleFieldChange("college", event.target.value)
                    }
                    placeholder="College or university"
                    autoComplete="organization"
                    className="sm:col-span-2"
                  />

                  <EditableInput
                    label="Course"
                    helper="The course or program you are currently pursuing."
                    name="course"
                    value={draft.course}
                    onChange={(event) =>
                      handleFieldChange("course", event.target.value)
                    }
                    placeholder="B.Tech, MBA, MBBS..."
                    autoComplete="off"
                    className="sm:col-span-2"
                  />
                </div>
              </EditProfileSection>

              <EditProfileSection
                id="lifestyle"
                eyebrow="Lifestyle"
                title="How you like to live"
                description="This section helps your profile read like a person, not a database record."
                accent="from-violet-400/70 via-fuchsia-300/25 to-transparent"
              >
                <div className="space-y-4">
                  <LifestyleTypeSelector
                    value={draft.lifestyle_type}
                    onChange={(value) =>
                      handleFieldChange("lifestyle_type", value)
                    }
                  />

                  <SleepScheduleSelector
                    value={draft.sleep_schedule}
                    onChange={(value) =>
                      handleFieldChange("sleep_schedule", value)
                    }
                  />

                  <CleanlinessSelector
                    value={draft.cleanliness_level}
                    onChange={(value) =>
                      handleFieldChange("cleanliness_level", value)
                    }
                  />

                  <SectionDivider label="About you" />

                  <ProfileTextarea
                    label="Bio"
                    helper="A short, honest intro helps roommates understand your vibe before they message you."
                    value={draft.bio}
                    onChange={(event) =>
                      handleFieldChange("bio", event.target.value)
                    }
                    placeholder="Share a few details about your routine, personality, and the kind of home you like to live in."
                  />
                </div>
              </EditProfileSection>

              <EditProfileSection
                id="preferences"
                eyebrow="Roommate preferences"
                title="Filters that make matching feel better"
                description="Keep the controls broad enough to discover people, but specific enough to make the fit feel real."
                accent="from-cyan-400/65 via-indigo-300/30 to-transparent"
              >
                <div className="space-y-6">
                  <BudgetRangeInput
                    minimumValue={draft.budget_min}
                    maximumValue={draft.budget_max}
                    onMinimumChange={(value) =>
                      handleFieldChange("budget_min", value)
                    }
                    onMaximumChange={(value) =>
                      handleFieldChange("budget_max", value)
                    }
                    error={
                      budgetInvalid
                        ? "The maximum budget should stay at or above the minimum."
                        : ""
                    }
                  />

                  <SectionDivider label="Match filters" />

                  <LifestyleSelector
                    title="Preferred gender"
                    description="Choose who you would feel comfortable sharing with."
                    options={preferredGenderOptions}
                    value={draft.preferred_gender}
                    onChange={(value) =>
                      handleFieldChange("preferred_gender", value)
                    }
                    compact
                  />

                  <LifestyleSelector
                    title="Food preference"
                    description="Keep the kitchen expectations clear before move-in day."
                    options={foodPreferenceOptions}
                    value={draft.food_preference}
                    onChange={(value) =>
                      handleFieldChange("food_preference", value)
                    }
                    compact
                  />

                  <LifestyleSelector
                    title="Smoking preference"
                    description="Set the shared-air expectations honestly."
                    options={smokingPreferenceOptions}
                    value={draft.smoking_preference}
                    onChange={(value) =>
                      handleFieldChange("smoking_preference", value)
                    }
                    compact
                  />

                  <SectionDivider label="Home setup" />

                  <div className="grid gap-4 md:grid-cols-2">
                    <EditableInput
                      label="Preferred city"
                      helper="Where you would most like to live next."
                      name="preferred_city"
                      value={draft.preferred_city}
                      onChange={(event) =>
                        handleFieldChange("preferred_city", event.target.value)
                      }
                      placeholder="A city you would rather match in"
                      autoComplete="address-level2"
                    />

                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                      <PreferenceToggle
                        label="Furnished required"
                        description="Only show places that already come furnished."
                        checked={draft.furnished_required}
                        onChange={(value) =>
                          handleFieldChange("furnished_required", value)
                        }
                        icon={BedDouble}
                      />

                      <PreferenceToggle
                        label="Shared chores"
                        description="Prefer roommates who split cleaning and household tasks."
                        checked={draft.wants_shared_chores}
                        onChange={(value) =>
                          handleFieldChange("wants_shared_chores", value)
                        }
                        icon={Sparkles}
                      />
                    </div>
                  </div>
                </div>
              </EditProfileSection>

              <EditProfileSection
                id="save"
                eyebrow="Save area"
                title="Review and keep the draft"
                description="When the profile feels right, save the current draft and keep moving."
                accent="from-emerald-400/70 via-cyan-300/25 to-transparent"
              >
                <SaveProfileButton
                  hasChanges={hasChanges}
                  saveState={saveState}
                  lastSavedAt={lastSavedAt}
                  onReset={handleReset}
                  saveDisabled={budgetInvalid}
                />
              </EditProfileSection>
            </form>

            <aside className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/72 p-5 shadow-[0_24px_80px_-56px_rgba(15,23,42,0.85)] backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-cyan-300 via-sky-300 to-indigo-400 text-slate-950">
                    <MapPin className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/85">
                      Live summary
                    </p>
                    <p className="mt-1 text-lg font-black tracking-tight text-white">
                      {profileName}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {buildPreviewLine(draft)}
                </p>

                <SectionDivider />

                <div className="space-y-3">
                  {buildSnapshotItems(draft).map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.2rem] border border-white/10 bg-white/[0.035] px-4 py-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-950/60 text-cyan-200">
                          <item.icon className="h-4 w-4" />
                        </span>

                        <div className="min-w-0">
                          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-500">
                            {item.label}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-white">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_80px_-56px_rgba(15,23,42,0.85)] backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/85">
                  Editing notes
                </p>

                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                  <p>
                    Identity fields remain locked so the profile keeps a stable,
                    trustworthy public shape.
                  </p>
                  <p>
                    The roommate controls above are intentionally broad enough
                    to keep discovery open while still feeling personal.
                  </p>
                  <p>
                    Use the save area once the draft reads like a real student,
                    not a form submission.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
