import { useState } from "react";
import {
  ArrowRight,
  Clock3,
  GraduationCap,
  Mail,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const contactChannels = [
  {
    icon: MessageSquare,
    eyebrow: "General support",
    title: "Questions about moving, roommates, or housing",
    description:
      "Reach out if you need help understanding the platform or choosing the right next step for your move.",
  },
  {
    icon: GraduationCap,
    eyebrow: "Campus and community",
    title: "Student groups, onboarding, and collaborations",
    description:
      "Talk to us about student communities, campus initiatives, and ways CityLink can support a smoother move-in journey.",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Trust and safety",
    title: "Report concerns with clarity and confidence",
    description:
      "If something feels off, we want to hear it. Share issues related to trust, safety, or listing quality.",
  },
];

const supportPoints = [
  {
    label: "Typical reply time",
    value: "Within 1 to 2 business days",
  },
  {
    label: "Best for",
    value: "Support, partnerships, feedback, and trust concerns",
  },
  {
    label: "Focus",
    value: "Student-first relocation, housing, and community guidance",
  },
];

const faqs = [
  {
    question: "What should I include in my message?",
    answer:
      "A short summary of your situation, your city or college context, and what kind of help you need will help us respond faster.",
  },
  {
    question: "Can I contact CityLink for partnerships?",
    answer:
      "Yes. The page is designed to handle student communities, campus partnerships, and local collaboration conversations too.",
  },
  {
    question: "Can I report a safety issue here?",
    answer:
      "Yes. If your message relates to trust or safety, choose that topic so it is easier to prioritize properly.",
  },
];

const initialForm = {
  fullName: "",
  email: "",
  topic: "General support",
  message: "",
};

const ContactUs = () => {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setIsSubmitted(false);
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    setFormData(initialForm);
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem]">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute left-12 top-28 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-10 top-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <section className="relative px-6 pb-20 pt-32 sm:px-8 lg:px-10 lg:pb-24 lg:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Talk to the CityLink team
            </div>

            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Reach out when your next move
              <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                needs a little clarity.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Whether you have questions about housing, roommate matching,
              student communities, or partnerships, this page is designed to
              make reaching CityLink feel simple and approachable.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Send a message
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Learn more about CityLink
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-2xl shadow-black/20">
            <div className="mb-6 flex items-center gap-3 text-indigo-300">
              <Mail className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                Support snapshot
              </span>
            </div>

            <h2 className="text-2xl font-semibold text-white">
              One place for questions, support, and collaboration.
            </h2>
            <p className="mt-4 leading-8 text-slate-300">
              The fastest path is the form below. Share enough context, and the
              page is ready to guide support, trust concerns, or student-focused
              conversations in one clean flow.
            </p>

            <div className="mt-8 space-y-4">
              {supportPoints.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                >
                  <p className="text-sm font-medium text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
              How we can help
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Different reasons to reach out, one consistent experience.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {contactChannels.map(
              ({ icon: Icon, eyebrow, title, description }) => (
                <div
                  key={title}
                  className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8"
                >
                  <div className="mb-5 inline-flex rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                    {eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    {title}
                  </h3>
                  <p className="mt-4 leading-8 text-slate-400">{description}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section
        id="contact-form"
        className="px-6 py-20 sm:px-8 lg:px-10 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/6 to-transparent p-8 backdrop-blur-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
              Send a message
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white">
              Tell us what you need help with.
            </h2>
            <p className="mt-4 max-w-2xl leading-8 text-slate-300">
              Use the form to share your question, feedback, collaboration
              request, or trust concern.
            </p>

            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-300">
                    Full name
                  </span>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/50 focus:bg-slate-950"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-300">
                    Email address
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/50 focus:bg-slate-950"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  Topic
                </span>
                <select
                  name="topic"
                  required
                  value={formData.topic}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-indigo-400/50 focus:bg-slate-950"
                >
                  <option>General support</option>
                  <option>Housing and roommates</option>
                  <option>Campus or community collaboration</option>
                  <option>Trust and safety</option>
                  <option>Feedback</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  Message
                </span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  required
                  placeholder="Share your question, issue, or idea in a few clear lines."
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/50 focus:bg-slate-950"
                />
              </label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                  Send message
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {isSubmitted ? (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-4 text-sm text-emerald-200">
                  Thanks. Your Form is Submitted.
                </div>
              ) : null}
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
              <div className="mb-5 flex items-center gap-3 text-indigo-300">
                <Clock3 className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                  Before you send
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-white">
                A little context helps us respond better.
              </h3>
              <div className="mt-6 space-y-5">
                <div className="flex gap-4">
                  <div className="mt-1 rounded-full border border-indigo-400/20 bg-indigo-500/10 p-2 text-indigo-300">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Share your goal</p>
                    <p className="mt-1 leading-7 text-slate-400">
                      Tell us whether you are looking for support, feedback, a
                      partnership, or help with trust and safety.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 rounded-full border border-indigo-400/20 bg-indigo-500/10 p-2 text-indigo-300">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      Add your student context
                    </p>
                    <p className="mt-1 leading-7 text-slate-400">
                      Mention your city, college, or move stage if it helps us
                      understand what you need faster.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 rounded-full border border-indigo-400/20 bg-indigo-500/10 p-2 text-indigo-300">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      Flag urgent concerns clearly
                    </p>
                    <p className="mt-1 leading-7 text-slate-400">
                      If the issue affects trust or safety, say that early in
                      your message so it is easier to prioritize.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
                Quick answers
              </p>
              <div className="mt-6 space-y-5">
                {faqs.map((item) => (
                  <div
                    key={item.question}
                    className="border-b border-white/10 pb-5 last:border-none last:pb-0"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {item.question}
                    </h3>
                    <p className="mt-2 leading-7 text-slate-400">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-2 sm:px-8 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-gradient-to-r from-indigo-500/15 via-white/5 to-cyan-400/10 p-8 text-center shadow-2xl shadow-black/20 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
            Prefer exploring first?
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Learn how CityLink helps students move with more confidence.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
            Visit the About page for the story, mission, and platform direction
            behind the experience.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Explore About
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
