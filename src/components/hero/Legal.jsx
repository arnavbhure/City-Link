import {
  ArrowRight,
  FileText,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  {
    icon: Lock,
    eyebrow: "Privacy",
    title: "How student information is handled",
    description:
      "CityLink collects basic profile details, preferences, and listing information to match students with suitable roommates, verified housing, and trusted local services. This data helps reduce scams, improve compatibility, and create a safer, more reliable moving experience. ",
  },
  {
    icon: FileText,
    eyebrow: "Terms",
    title: "What using the platform means",
    description:
      "Using CityLink means following shared guidelines for honest profiles, accurate listings, and respectful behavior, ensuring a reliable and trustworthy experience for everyone on the platform.",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Trust",
    title: "Safety, moderation, and reporting",
    description:
      "CityLink prioritizes student safety through moderation, verification checks, and easy reporting tools, helping identify suspicious listings and maintain a trusted, secure community.",
  },
];

const policySections = [
  {
    id: "privacy",
    eyebrow: "Privacy policy",
    title: "We collect only what helps make the move more trustworthy.",
    description:
      "CityLink may collect account details, profile information, housing preferences, communication details, and support history to help students discover better matches and safer listings.",
    points: [
      "Information is used to improve roommate discovery, listing quality, account security, and support workflows.",
      "Sensitive details should be kept minimal, reviewed carefully, and protected through secure handling practices.",
      "Students should be able to request clarification, updates, or deletion support as the platform matures.",
    ],
  },
  {
    id: "terms",
    eyebrow: "Terms of service",
    title: "Platform use should stay respectful, accurate, and student-safe.",
    description:
      "By using CityLink, people agree to provide truthful information, avoid harmful or misleading listings, and use the platform in ways that support honest housing and roommate decisions.",
    points: [
      "Users should not post fraudulent listings, impersonate others, or misuse student communities.",
      "CityLink may review, remove, or restrict content that undermines trust, violates platform rules, or creates safety concerns.",
      "Accounts and platform access may change as product features evolve, improve, or need moderation protection.",
    ],
  },
  {
    id: "safety",
    eyebrow: "Trust and safety",
    title:
      "Verification and reporting are part of the product, not an afterthought.",
    description:
      "CityLink is designed to reduce uncertainty for students moving into unfamiliar cities. Trust and safety depends on review flows, community reporting, and strong follow-up when something feels wrong.",
    points: [
      "Students should be able to flag suspicious listings, misleading information, or behavior that creates discomfort or risk.",
      "Moderation decisions may prioritize student safety, marketplace integrity, and credible reporting over platform growth.",
      "Community feedback can shape how listings, roommate profiles, and support processes are reviewed over time.",
    ],
  },
  {
    id: "contact-legal",
    eyebrow: "Questions and requests",
    title: "Legal, privacy, and policy questions should be easy to route.",
    description:
      "If someone needs help understanding the policy, reporting an issue, or making a privacy-related request, CityLink should provide a clear next step through the contact flow.",
    points: [
      "Use the contact page for support questions, trust concerns, and policy clarifications.",
      "Privacy and legal requests should be acknowledged clearly and handled with a transparent review path.",
      "This page is a strong design foundation and should be finalized with counsel-approved wording before production launch.",
    ],
  },
];

const quickFacts = [
  {
    label: "Last updated",
    value: "March 21, 2026",
  },
  {
    label: "Designed for",
    value: "Student housing, roommates, and community trust",
  },
  {
    label: "Covers",
    value: "Privacy, terms, moderation, and policy questions",
  },
];

const Legal = () => {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem]">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute left-10 top-28 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-12 top-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <section className="relative px-6 pb-20 pt-32 sm:px-8 lg:px-10 lg:pb-24 lg:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Legal, privacy, and trust overview
            </div>

            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Terms &
              <span className="block bg-linear-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              By using CityLink you agree to accept our terms and privacy
              policy.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#privacy"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Privacy
              </a>
              <a
                href="#terms"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Terms
              </a>
              <a
                href="#safety"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Trust and safety
              </a>
              <a
                href="#contact-legal"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-2xl shadow-black/20">
            <div className="mb-6 flex items-center gap-3 text-indigo-300">
              <FileText className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                Policy snapshot
              </span>
            </div>

            <h2 className="text-2xl font-semibold text-white">
              Privacy Policy
            </h2>
            <p className="mt-4 leading-8 text-slate-300">
              The goal here is clarity. Students should quickly understand how
              their data is treated, what behavior the platform expects, and
              where they can go when they need help or want to raise a concern.
            </p>
            <br />
            <p className="mt-4 leading-8 text-slate-300">
              Data collected is confidential and is not shared or accessed by
              anyone.
            </p>

            <div className="mt-8 space-y-4">
              {quickFacts.map((item) => (
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
              What this page covers
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              The legal essentials, organized in the same language as the
              product.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map(({ icon: Icon, eyebrow, title, description }) => (
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
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-8">
          {policySections.map((section) => (
            <section
              id={section.id}
              key={section.id}
              className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/6 to-transparent p-8 backdrop-blur-sm sm:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
                    {section.eyebrow}
                  </p>
                  <h2 className="mt-4 text-3xl font-bold text-white">
                    {section.title}
                  </h2>
                  <p className="mt-5 leading-8 text-slate-300">
                    {section.description}
                  </p>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6 sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Key points
                  </p>
                  <div className="mt-6 space-y-4">
                    {section.points.map((point) => (
                      <div key={point} className="flex gap-4">
                        <div className="mt-1 rounded-full border border-indigo-400/20 bg-indigo-500/10 p-2 text-indigo-300">
                          <ShieldCheck className="h-4 w-4" />
                        </div>
                        <p className="leading-7 text-slate-300">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8">
            <div className="mb-5 flex items-center gap-3 text-indigo-300">
              <Users className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                Why it matters
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white">
              Strong legal pages reduce uncertainty just like strong product
              design does.
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              For a student platform, privacy and trust language should feel
              plain, reassuring, and useful. This page is designed to support
              that tone without falling into a generic policy wall.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <div className="mb-5 flex items-center gap-3 text-indigo-300">
              <Mail className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                Need help?
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-white">
              Route policy questions through the contact page.
            </h3>
            <p className="mt-4 leading-8 text-slate-300">
              If someone needs support, wants policy clarification, or needs to
              raise a privacy or trust issue, the next step should feel clear
              and immediate.
            </p>
            <div className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Go to Contact
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-6 sm:px-8 lg:px-10 lg:pb-28">
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Ask a question
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
          >
            Back to home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Legal;
