import { motion } from "framer-motion";
import { createElement } from "react";
import {
  ArrowRight,
  GraduationCap,
  Handshake,
  Home,
  MapPinned,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const MotionArticle = motion.article;
const MotionDiv = motion.div;

const features = [
  {
    icon: UsersRound,
    title: "Find Verified Roommates",
    description: "Connect with students and match preferences easily.",
  },
  {
    icon: Home,
    title: "Discover Trusted Housing",
    description: "Browse verified PGs, flats, and rentals near your campus.",
  },
  {
    icon: Handshake,
    title: "Built-in Student Community",
    description: "Join a network of students for help and connections.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    description:
      "All listings are reviewed by students to ensure trust and safety.",
  },
  {
    icon: MapPinned,
    title: "Local Services",
    description:
      "Find food, laundry, and essentials recommended by students.",
  },
  {
    icon: GraduationCap,
    title: "Senior Guidance",
    description:
      "Get help and advice from seniors already in your destination city.",
  },
];

const featureGroups = [
  {
    label: "Start",
    items: [features[0], features[1]],
  },
  {
    label: "Trust",
    items: [features[3]],
  },
  {
    label: "Settle",
    items: [features[2], features[4], features[5]],
  },
];

const Features = () => {
  const [primaryFeature, ...supportingFeatures] = features;
  const PrimaryIcon = primaryFeature.icon;

  return (
    <>
      <section
        id="features"
        className="relative overflow-hidden border-y border-white/10 bg-slate-950 px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(79,70,229,0.08),transparent_36%,rgba(236,72,153,0.05)_74%,transparent)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm font-semibold text-indigo-200">
                <Sparkles className="h-4 w-4" />
                How CityLink works
              </p>
              <h2 className="mt-6 max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                A clearer path from searching to settling in.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-400">
                From finding the right roommate to settling into your new
                environment, CityLink makes every step simple, safe, and
                student-driven.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <MotionArticle
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-[2rem] border border-indigo-300/20 bg-indigo-400/[0.08] p-7 shadow-2xl shadow-black/20 md:row-span-2"
              >
                <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-300/20 bg-indigo-400/10 text-indigo-100">
                  <PrimaryIcon className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold uppercase text-indigo-200">
                  Student guided
                </p>
                <h3 className="mt-4 text-3xl font-bold text-white">
                  {primaryFeature.title}
                </h3>
                <p className="mt-4 leading-8 text-slate-300">
                  {primaryFeature.description}
                </p>
                <div className="mt-10 h-px w-full bg-gradient-to-r from-indigo-200/50 via-white/10 to-transparent" />
                <p className="mt-5 text-sm leading-6 text-slate-400">
                  Built for students moving to a new city.
                </p>
              </MotionArticle>

              {supportingFeatures.map(({ icon, title, description }) => (
                <MotionArticle
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45 }}
                  whileHover={{ y: -3 }}
                  className="group rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 transition-colors duration-300 hover:border-white/18 hover:bg-white/[0.055]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/80 text-indigo-200 transition group-hover:border-indigo-300/25 group-hover:bg-indigo-400/10">
                      {createElement(icon, { className: "h-5 w-5" })}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {title}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-400">
                        {description}
                      </p>
                    </div>
                  </div>
                </MotionArticle>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-indigo-300">
                Move to a New City with Confidence
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Make every step simple, safe, and student-driven.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
                From finding the right roommate to settling into your new
                environment, CityLink makes every step simple, safe, and
                student-driven.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button as={Link} to="/signup" size="lg">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button as="a" href="#features" size="lg" variant="secondary">
                  Explore Community
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-8 left-6 w-px bg-gradient-to-b from-transparent via-indigo-300/30 to-transparent" />
              <div className="space-y-5">
                {featureGroups.map((group, index) => (
                  <MotionDiv
                    key={group.label}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className="relative pl-14"
                  >
                    <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-indigo-300/30 bg-slate-950 text-xs font-semibold text-indigo-200">
                      {index + 1}
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/55 p-5">
                      <p className="text-sm font-semibold uppercase text-slate-500">
                        {group.label}
                      </p>
                      <div className="mt-4 space-y-4">
                        {group.items.map(({ icon, title, description }) => (
                          <div key={title} className="flex gap-3">
                            {createElement(icon, {
                              className:
                                "mt-1 h-4 w-4 shrink-0 text-indigo-300",
                            })}
                            <div>
                              <h3 className="font-semibold text-white">
                                {title}
                              </h3>
                              <p className="mt-1 text-sm leading-6 text-slate-400">
                                {description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 border-t border-white/10 pt-10">
            <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-lg font-semibold text-white">
                  Ready to find your perfect roommate and home?
                </p>
                <p className="mt-2 max-w-2xl text-slate-400">
                  Discover verified roommates, trusted housing, and
                  community-powered services.
                </p>
              </div>
              <Button as={Link} to="/signup" className="shrink-0">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
