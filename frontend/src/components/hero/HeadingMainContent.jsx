import { motion } from "framer-motion";
import { createElement } from "react";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  House,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const MotionDiv = motion.div;

const movePath = [
  {
    icon: Users,
    title: "Find Verified Roommates",
    description: "Connect with students and match preferences easily.",
  },
  {
    icon: House,
    title: "Discover Trusted Housing",
    description: "Browse verified PGs, flats, and rentals near your campus.",
  },
  {
    icon: GraduationCap,
    title: "Senior Guidance",
    description:
      "Get help and advice from seniors already in your destination city.",
  },
];

const trustNotes = [
  "verified roommates",
  "trusted housing",
  "community-powered services",
];

const Heading = () => {
  return (
    <section className="relative isolate overflow-hidden px-4 pt-32 pb-16 sm:px-6 lg:px-8 lg:pt-44 lg:pb-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.2),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0),rgba(2,6,23,0.92)_72%)]" />
      <div className="absolute inset-x-0 top-24 -z-10 h-px bg-gradient-to-r from-transparent via-indigo-300/30 to-transparent" />
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.03fr_0.97fr]">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm font-medium text-indigo-200 shadow-lg shadow-black/20 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.9)]" />
            Introducing CityLink - Your Student Community Hub
          </div>
          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Find Your People,
            <span className="mt-2 block bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Find Your Place.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Discover verified roommates, trusted housing, and community-powered
            services - all in one platform built for students moving to a new
            city.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button as={Link} to="/signup" size="lg">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href="#features" size="lg" variant="secondary">
              Explore Community
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-400">
            {trustNotes.map((note) => (
              <span key={note} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-300" />
                {note}
              </span>
            ))}
          </div>{" "}
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -left-6 top-10 hidden h-44 w-px bg-gradient-to-b from-transparent via-indigo-300/40 to-transparent lg:block" />
          <div className="relative rounded-[2rem] border border-white/10 bg-slate-950/60 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-5">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase text-indigo-200">
                    Move with confidence
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    From finding the right roommate to settling into your new
                    environment.
                  </p>
                </div>
                <div className="rounded-full border border-indigo-300/20 bg-indigo-400/10 p-3 text-indigo-200">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-7 space-y-3">
                {movePath.map(({ icon, title, description }, index) => (
                  <MotionDiv
                    key={title}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className={`group relative overflow-hidden rounded-2xl border p-4 ${
                      index === 1
                        ? "border-indigo-300/25 bg-indigo-400/[0.09]"
                        : "border-white/10 bg-slate-950/70"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-indigo-200 transition group-hover:border-indigo-300/30 group-hover:bg-indigo-400/10">
                        {createElement(icon, { className: "h-5 w-5" })}
                      </div>
                      <div>
                        <h2 className="font-semibold text-white">{title}</h2>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {description}
                        </p>
                      </div>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default Heading;
