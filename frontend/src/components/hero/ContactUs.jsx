import { useState } from "react";
import {
  ArrowRight,
  Clock3,
  GraduationCap,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import SubmitContactUs from "../../api/ContactUs/SubmitContactUs";

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

const initialForm = {
  fullName: "",
  email: "",
  topic: "General support",
  message: "",
};

const ContactUs = () => {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errormessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setIsSubmitted(false);
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await SubmitContactUs(formData);
      if (response.success) {
        setIsSubmitted(true);
        setFormData(initialForm);
        return;
      }
    } catch {
      setErrorMessage(
        "An error occurred while submitting the contact us form. Please try again later.",
      );
      setIsSubmitted(true);
      return;
    }
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
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Learn more about CityLink
                <ArrowRight className="h-4 w-4" />
              </a>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
