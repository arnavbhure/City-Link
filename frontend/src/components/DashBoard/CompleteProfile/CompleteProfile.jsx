import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import StepBudget from "./steps/StepBudget";
import StepLifestyle from "./steps/StepLifestyle";
import StepPreferences from "./steps/StepPreferences";
import StepReview from "./steps/StepReview";
import ErrorMessage from "../../ErrorMessage";
import {
  STEP_META,
  TOTAL_STEPS,
  getFirstInvalidStep,
  getReviewItems,
  getStepErrors,
  initialFormState,
} from "./utils/completeProfileUtils";
import CompleteProfileResponse from "../../../api/CompleteProfile";
import { useSelector } from "react-redux";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const is_profile_completed = useSelector(
    (state) => state.user.profile_listing_completed,
  );
  useEffect(() => {
    if (is_profile_completed) {
      navigate("/dashboard");
    }
  }, [is_profile_completed, navigate]);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState(initialFormState);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepDirection, setStepDirection] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const { user_preferences: preferences, user_lifestyle: lifestyle } = formData;

  const updatePreference = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      user_preferences: {
        ...previous.user_preferences,
        [field]: value,
      },
    }));
  };

  const updateLifestyle = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      user_lifestyle: {
        ...previous.user_lifestyle,
        [field]: value,
      },
    }));
  };

  const handleBudgetChange = (field, value) => {
    updatePreference(field, value === "" ? "" : Number(value));
  };

  const currentStepErrors = getStepErrors({
    stepIndex: currentStep,
    preferences,
    lifestyle,
  });

  const allStepErrors = {
    ...getStepErrors({
      stepIndex: 0,
      preferences,
      lifestyle,
    }),
    ...getStepErrors({
      stepIndex: 3,
      preferences,
      lifestyle,
    }),
  };

  const budgetStepIncomplete =
    preferences.budget_min === "" || preferences.budget_max === "";

  const primaryButtonDisabled =
    currentStep === TOTAL_STEPS - 1
      ? Object.keys(allStepErrors).length > 0
      : currentStep === 0 && budgetStepIncomplete;

  const handlePrevious = () => {
    if (currentStep === 0) {
      return;
    }

    setStepDirection(-1);
    setCurrentStep((previous) => previous - 1);
  };

  const handleNext = () => {
    if (currentStep === TOTAL_STEPS - 1) {
      return;
    }

    if (Object.keys(currentStepErrors).length > 0) {
      return;
    }

    setStepDirection(1);
    setCurrentStep((previous) => previous + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (currentStep < TOTAL_STEPS - 1) {
      handleNext();
      return;
    }

    const firstInvalidStep = getFirstInvalidStep({
      preferences,
      lifestyle,
    });

    if (firstInvalidStep !== -1) {
      setStepDirection(firstInvalidStep > currentStep ? 1 : -1);
      setCurrentStep(firstInvalidStep);
      return;
    }

    const response = await CompleteProfileResponse(formData);

    if (response.success) {
      setSubmitted(true);
      return;
    }
    setErrorMessage(response.message);
  };

  const progressPercentage = ((currentStep + 1) / TOTAL_STEPS) * 100;
  const reviewItems = getReviewItems({ preferences, lifestyle });

  const stepComponents = [
    <StepBudget
      key="budget"
      preferences={preferences}
      currentStepErrors={currentStepErrors}
      onBudgetChange={handleBudgetChange}
      onPreferenceChange={updatePreference}
    />,
    <StepPreferences
      key="preferences"
      preferences={preferences}
      onPreferenceChange={updatePreference}
    />,
    <StepLifestyle
      key="lifestyle"
      lifestyle={lifestyle}
      onLifestyleChange={updateLifestyle}
    />,
    <StepReview
      key="review"
      lifestyle={lifestyle}
      currentStepErrors={currentStepErrors}
      reviewItems={reviewItems}
      onLifestyleChange={updateLifestyle}
    />,
  ];

  if (submitted) {
    return (
      <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[15%] top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute right-[10%] top-40 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="rounded-4xl border border-white/10 bg-slate-900/75 p-8 shadow-[0_40px_120px_-50px_rgba(14,165,233,0.55)] backdrop-blur-xl sm:p-10">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10 text-emerald-300">
                <CheckCircle2 className="h-9 w-9" />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Profile complete
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Your roommate profile is ready.
              </h1>
              <p className="mt-4 text-base leading-8 text-slate-300">
                You have successfully completed profile completion .
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-300 to-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_20px_50px_-25px_rgba(56,189,248,0.9)] transition hover:-translate-y-0.5"
                >
                  Back to dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-10 lg:pt-36">
      <style>{`
        @keyframes citylinkStepForward {
          from {
            opacity: 0;
            transform: translate3d(32px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes citylinkStepBackward {
          from {
            opacity: 0;
            transform: translate3d(-32px, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[12%] top-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[6%] top-32 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute bottom-6 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-400/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-5 shadow-[0_40px_120px_-50px_rgba(14,165,233,0.45)] backdrop-blur-xl sm:p-7 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-cyan-200">
                <Sparkles className="h-4 w-4" />
                Complete your CityLink profile
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Build a profile that matches the way you actually live.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                A few thoughtful details now make roommate matches feel sharper,
                faster, and more compatible from the first swipe.
              </p>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5 lg:w-[280px]">
              <p className="text-sm font-semibold text-white">
                Step {currentStep + 1} of {TOTAL_STEPS}
              </p>
              <p className="mt-2 text-lg font-bold text-white">
                {STEP_META[currentStep].title}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {STEP_META[currentStep].description}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-4 sm:p-5">
            <div className="h-2 rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-300 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {STEP_META.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isComplete = index < currentStep;

                return (
                  <div
                    key={step.title}
                    className={`rounded-[1.4rem] border p-4 transition ${
                      isActive
                        ? "border-cyan-300/30 bg-cyan-400/10"
                        : isComplete
                          ? "border-emerald-300/20 bg-emerald-400/8"
                          : "border-white/10 bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex rounded-2xl p-2 ${
                          isActive
                            ? "bg-cyan-400/15 text-cyan-200"
                            : isComplete
                              ? "bg-emerald-400/15 text-emerald-200"
                              : "bg-white/[0.04] text-slate-400"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                          {isComplete ? "Done" : `Step ${index + 1}`}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {step.title}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <div
              key={currentStep}
              style={{
                animation: `${
                  stepDirection >= 0
                    ? "citylinkStepForward"
                    : "citylinkStepBackward"
                } 320ms cubic-bezier(0.22, 1, 0.36, 1)`,
              }}
            >
              {stepComponents[currentStep]}
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {currentStep === 0 && budgetStepIncomplete ? (
                  <p className="text-sm leading-6 text-slate-400">
                    Add both budget values to unlock the next step.
                  </p>
                ) : currentStep === TOTAL_STEPS - 1 ? (
                  <p className="text-sm leading-6 text-slate-400">
                    Final check: review your answers and submit when it feels
                    right.
                  </p>
                ) : (
                  <p className="text-sm leading-6 text-slate-400">
                    Next up: {STEP_META[currentStep + 1].title}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition ${
                    currentStep === 0
                      ? "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600"
                      : "border-white/10 bg-white/[0.04] text-white hover:border-white/20 hover:bg-white/[0.08]"
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </button>

                <ErrorMessage error={errorMessage} />

                <button
                  type="submit"
                  disabled={primaryButtonDisabled}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
                    primaryButtonDisabled
                      ? "cursor-not-allowed bg-slate-800 text-slate-500"
                      : "bg-gradient-to-r from-cyan-300 to-sky-400 text-slate-950 shadow-[0_20px_50px_-25px_rgba(56,189,248,0.9)] hover:-translate-y-0.5"
                  }`}
                >
                  {currentStep === TOTAL_STEPS - 1
                    ? "Submit profile"
                    : "Next step"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CompleteProfile;
