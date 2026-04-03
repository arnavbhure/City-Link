import { createElement, useState } from "react";
import { useSelector } from "react-redux";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  House,
  MapPin,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Wallet,
  Wifi,
} from "lucide-react";
import { Link } from "react-router-dom";

const amenityOptions = [
  { name: "furnished", label: "Fully furnished" },
  { name: "wifi", label: "Wi-Fi included" },
  { name: "meals", label: "Meals available" },
  { name: "attachedWashroom", label: "Attached washroom" },
  { name: "laundry", label: "Laundry support" },
  { name: "powerBackup", label: "Power backup" },
];

const trustGuidelines = [
  {
    icon: ShieldCheck,
    title: "Clear details win faster",
    description:
      "Students respond better when rent, deposit, move timing, and setup are written without guesswork.",
  },
  {
    icon: BadgeCheck,
    title: "Trust starts with accuracy",
    description:
      "List what is actually included so the first conversation stays useful and transparent.",
  },
  {
    icon: MessagesSquare,
    title: "Reduce back-and-forth",
    description:
      "The more precise your description is, the fewer repetitive questions you need to answer later.",
  },
];

const initialForm = {
  title: "",
  listingType: "Shared flat",
  city: "",
  locality: "",
  rent: "",
  deposit: "",
  availability: "Immediate",
  roomType: "Private room",
  accommodationFor: "Co-ed",
  moveInDate: "",
  contactPreference: "In-app chat",
  description: "",
  houseRules: "",
  furnished: true,
  wifi: true,
  meals: false,
  attachedWashroom: false,
  laundry: false,
  powerBackup: false,
};

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/50 focus:bg-slate-950";

const PostListing = () => {
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState(initialForm);
  const [submitState, setSubmitState] = useState("idle");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSubmitState("idle");
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitState("success");
  };

  const previewAmenities = amenityOptions
    .filter((option) => formData[option.name])
    .map((option) => option.label);

  const completionItems = [
    Boolean(formData.title && formData.city && formData.locality),
    Boolean(formData.rent && formData.deposit),
    Boolean(formData.moveInDate),
    Boolean(formData.description.trim().length > 40),
  ];

  const completedCount = completionItems.filter(Boolean).length;
  const completionPercentage = (completedCount / completionItems.length) * 100;
  const hostName = user.full_name || "CityLink host";
  const hostCollege = user.college || "Student community member";

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem]">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/18 blur-3xl" />
        <div className="absolute left-8 top-28 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-8 top-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <section className="relative px-4 pb-16 pt-28 sm:px-8 sm:pb-18 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
          <section className="grid gap-5 rounded-[1.6rem] border border-white/10 bg-slate-900/70 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300">
                <Sparkles className="h-4 w-4" />
                Listing publisher
              </div>

              <h1 className="mt-5 text-[2.15rem] font-black leading-none tracking-tight text-white sm:mt-6 sm:text-5xl">
                Create a listing that feels
                <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                  clear, trusted, and easy to reply to.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Describe the room, move timing, and setup in one polished flow
                so the right students can understand the opportunity quickly.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                  Back to dashboard
                </Link>
                <Link
                  to="/explore-housing"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Browse active listings
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
                What good listings communicate
              </p>
              <div className="mt-5 space-y-4">
                {trustGuidelines.map(({ icon, title, description }) => (
                  <div
                    key={title}
                    className="rounded-[1.25rem] border border-white/10 bg-slate-950/60 p-4"
                  >
                    <div className="flex gap-4">
                      <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
                        {createElement(icon, { className: "h-5 w-5" })}
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-white sm:text-lg">
                          {title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-[0.96rem] sm:leading-7">
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <form
              className="rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
                    Listing details
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                    Fill in the essentials
                  </h2>
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                  {completedCount} of {completionItems.length} sections ready
                </div>
              </div>

              <div className="mt-7 space-y-7">
                <section className="rounded-[1.45rem] border border-white/10 bg-white/5 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        Basics
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        Help students understand the type of listing and where it
                        is located.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <label className="block sm:col-span-2">
                      <span className="mb-2 block text-sm font-medium text-slate-300">
                        Listing title
                      </span>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Ex: Furnished private room near North Campus"
                        required
                        className={inputClassName}
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">
                        Listing type
                      </span>
                      <select
                        name="listingType"
                        value={formData.listingType}
                        onChange={handleChange}
                        className={inputClassName}
                      >
                        <option>Shared flat</option>
                        <option>Private room</option>
                        <option>PG</option>
                        <option>Studio</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">
                        Room style
                      </span>
                      <select
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleChange}
                        className={inputClassName}
                      >
                        <option>Private room</option>
                        <option>Shared room</option>
                        <option>Entire studio</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">
                        City
                      </span>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Delhi, Bengaluru, Pune..."
                        required
                        className={inputClassName}
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">
                        Locality
                      </span>
                      <input
                        type="text"
                        name="locality"
                        value={formData.locality}
                        onChange={handleChange}
                        placeholder="Area, lane, or landmark"
                        required
                        className={inputClassName}
                      />
                    </label>
                  </div>
                </section>

                <section className="rounded-[1.45rem] border border-white/10 bg-white/5 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
                      <Wallet className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        Pricing and timing
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        Students compare rent clarity and move-in readiness very
                        quickly.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">
                        Monthly rent
                      </span>
                      <input
                        type="text"
                        name="rent"
                        value={formData.rent}
                        onChange={handleChange}
                        placeholder="Ex: INR 13,500"
                        required
                        className={inputClassName}
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">
                        Deposit
                      </span>
                      <input
                        type="text"
                        name="deposit"
                        value={formData.deposit}
                        onChange={handleChange}
                        placeholder="Ex: 1 month deposit"
                        required
                        className={inputClassName}
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">
                        Availability
                      </span>
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        className={inputClassName}
                      >
                        <option>Immediate</option>
                        <option>This month</option>
                        <option>Next month</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">
                        Move-in date
                      </span>
                      <input
                        type="date"
                        name="moveInDate"
                        value={formData.moveInDate}
                        onChange={handleChange}
                        required
                        className={inputClassName}
                      />
                    </label>
                  </div>
                </section>

                <section className="rounded-[1.45rem] border border-white/10 bg-white/5 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
                      <House className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        Amenities and fit
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        Show what kind of setup students can actually expect.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">
                        Accommodation for
                      </span>
                      <select
                        name="accommodationFor"
                        value={formData.accommodationFor}
                        onChange={handleChange}
                        className={inputClassName}
                      >
                        <option>Co-ed</option>
                        <option>Men only</option>
                        <option>Women only</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">
                        Preferred contact
                      </span>
                      <select
                        name="contactPreference"
                        value={formData.contactPreference}
                        onChange={handleChange}
                        className={inputClassName}
                      >
                        <option>In-app chat</option>
                        <option>Phone call</option>
                        <option>WhatsApp</option>
                      </select>
                    </label>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {amenityOptions.map((option) => (
                      <label
                        key={option.name}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-4"
                      >
                        <input
                          type="checkbox"
                          name={option.name}
                          checked={formData[option.name]}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-900"
                        />
                        <span className="text-sm leading-6 text-slate-300">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </section>

                <section className="rounded-[1.45rem] border border-white/10 bg-white/5 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
                      <MessagesSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        Description
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        Add the context students need before they message you.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-5">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">
                        About the listing
                      </span>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        required
                        placeholder="Mention commute, furnishing, vibe of the place, and anything that makes the stay smoother for students."
                        className={`${inputClassName} min-h-36 resize-y`}
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">
                        House rules or expectations
                      </span>
                      <textarea
                        name="houseRules"
                        value={formData.houseRules}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Ex: Quiet after 11 PM, no indoor smoking, shared cleaning rota..."
                        className={`${inputClassName} min-h-28 resize-y`}
                      />
                    </label>
                  </div>
                </section>
              </div>

              {submitState === "success" ? (
                <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  Listing draft looks ready. The content is now polished enough
                  for review and backend submission wiring.
                </div>
              ) : null}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                  Publish listing preview
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFormData(initialForm);
                    setSubmitState("idle");
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
                >
                  Reset form
                </button>
              </div>
            </form>

            <div className="space-y-6 lg:sticky lg:top-32 lg:self-start">
              <section className="rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
                      Live preview
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-white">
                      How students will read it
                    </h2>
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                    {Math.round(completionPercentage)}% ready
                  </div>
                </div>

                <div className="mt-5 h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 transition-all"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>

                <article className="mt-6 rounded-[1.45rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Draft listing
                      </div>
                      <h3 className="mt-4 text-2xl font-bold text-white">
                        {formData.title || "Your listing title will appear here"}
                      </h3>
                      <p className="mt-2 text-sm text-slate-300">
                        {formData.listingType} • {formData.roomType}
                      </p>
                    </div>

                    <div className="w-fit rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-indigo-200">
                      {formData.rent || "Add rent"}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3">
                      <MapPin className="h-4 w-4 text-cyan-300" />
                      <span>
                        {formData.locality
                          ? `${formData.locality}, ${formData.city || ""}`
                          : "Add city and locality"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3">
                      <CalendarDays className="h-4 w-4 text-indigo-300" />
                      <span>{formData.availability}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200">
                      {formData.deposit || "Add deposit"}
                    </span>
                    <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200">
                      {formData.accommodationFor}
                    </span>
                    <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-200">
                      {formData.contactPreference}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-300">
                    {formData.description.trim() ||
                      "Add a clear description so students can quickly understand the space, location, and vibe before they contact you."}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {(previewAmenities.length
                      ? previewAmenities
                      : ["Select amenities to highlight"]
                    ).map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-slate-950/60 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-indigo-300">
                        <Wifi className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{hostName}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          {hostCollege}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </section>

              <section className="rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-400/10 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
                  Before you post
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Final checklist
                </h2>

                <div className="mt-6 space-y-4">
                  {[
                    "Rent and deposit are visible without follow-up questions.",
                    "Move-in date matches the urgency students will filter for.",
                    "Description clearly states what is furnished or included.",
                    "House rules are written early enough to avoid mismatched expectations.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-[1.2rem] border border-white/10 bg-slate-950/55 px-4 py-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                      <p className="text-sm leading-6 text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default PostListing;
