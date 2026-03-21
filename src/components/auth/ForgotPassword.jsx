import { useState } from "react";
import { ArrowRight, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const initialForm = {
  email: "",
};

const ForgotPassword = () => {
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
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem]">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute left-12 top-28 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-12 top-24 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <section className="relative px-6 pb-20 pt-32 sm:px-8 lg:px-10 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-xl">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-2xl shadow-black/20 sm:p-10">
            <div className="mb-8 text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm font-medium text-indigo-300">
                <Sparkles className="h-4 w-4" />
                Reset your password
              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Forgot your password?
              </h1>
              <p className="mt-4 leading-7 text-slate-400">
                Enter your email and we will send you the next step for getting
                back into your CityLink account.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-300">
                  Email address
                </span>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-500">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/50 focus:bg-slate-950"
                  />
                </div>
              </label>

              {isSubmitted ? (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  Reset UI is ready. Connect this form to your password reset
                  email flow to make it live.
                </div>
              ) : null}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Send reset link
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-5">
              <div className="flex gap-4">
                <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Keep it simple
                  </h2>
                  <p className="mt-2 leading-7 text-slate-400">
                    This page stays intentionally minimal so the reset flow feels
                    calm, clear, and consistent with the rest of the auth
                    experience.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/login"
                className="font-medium text-indigo-300 transition hover:text-indigo-200"
              >
                Back to login
              </Link>
              <Link
                to="/signup"
                className="font-medium text-indigo-300 transition hover:text-indigo-200"
              >
                Create a new account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
