import ReviewItem from "../ui/ReviewItem";
import StepIntro from "../ui/StepIntro";
import {
  BIO_LIMIT,
  cardClassName,
  inputClassName,
} from "../utils/completeProfileUtils";

const StepReview = ({
  lifestyle,
  currentStepErrors,
  reviewItems,
  onLifestyleChange,
}) => {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
      <div className="space-y-6">
        <StepIntro
          eyebrow="Step 4"
          title="Add a short intro, then review everything"
          description="A warm bio helps matches understand your personality before they message. Keep it concise and specific."
        />

        <div className={`${cardClassName} space-y-4`}>
          <label className="block">
            <span className="text-sm font-semibold text-white">Short bio</span>
            <textarea
              rows={7}
              maxLength={BIO_LIMIT + 20}
              placeholder="I'm easygoing, usually up early for class, and appreciate a clean shared kitchen. Looking for roommates who communicate well and respect quiet hours."
              value={lifestyle.bio}
              onChange={(event) => onLifestyleChange("bio", event.target.value)}
              className={`${inputClassName} resize-none`}
            />
          </label>

          <div className="flex items-center justify-between gap-4 text-sm">
            <p className="text-slate-400">
              Aim for a quick, honest snapshot of how you live.
            </p>
            <p
              className={`font-medium ${
                lifestyle.bio.length > BIO_LIMIT
                  ? "text-rose-300"
                  : "text-slate-400"
              }`}
            >
              {lifestyle.bio.length}/{BIO_LIMIT}
            </p>
          </div>

          {currentStepErrors.bio ? (
            <p className="text-sm text-rose-300">{currentStepErrors.bio}</p>
          ) : null}
        </div>
      </div>

      <aside className={`${cardClassName} space-y-5`}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">Review profile</p>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              This is the payload that will power roommate matching.
            </p>
          </div>
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Ready
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {reviewItems.map((item) => (
            <ReviewItem key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </aside>
    </div>
  );
};

export default StepReview;
