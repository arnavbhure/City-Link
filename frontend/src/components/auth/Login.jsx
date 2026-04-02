import { useEffect, useState } from "react";
import { ArrowRight, House, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import login from "../../api/auth/login";
import resendVerification from "../../api/auth/resendVerification";
import { clearStoredAuth } from "../../utils/auth";
import { useDispatch } from "react-redux";
import { isLoginActions } from "../../store/isLoggedIn";
import { userInfoActions } from "../../store/user/userSlice";

const reasons = [
  {
    icon: House,
    title: "Pick up where you left off",
    description:
      "Return to your saved housing search, preferred listings, and move planning flow.",
  },
  {
    icon: Users,
    title: "Reconnect with your matches",
    description:
      "See roommate conversations, student recommendations, and your ongoing CityLink activity.",
  },
  {
    icon: ShieldCheck,
    title: "Stay inside a trusted experience",
    description:
      "Your account keeps your housing journey, support flow, and student-focused trust signals together.",
  },
];

const initialForm = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialForm);
  const [loginStatus, setLoginStatus] = useState("idle");
  const [errors, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [canResendVerification, setCanResendVerification] = useState(false);
  const [isResendingVerification, setIsResendingVerification] = useState(false);
  const [searchParams] = useSearchParams();
  const verificationStatus = searchParams.get("verification");
  const navigate = useNavigate();

  useEffect(() => {
    if (verificationStatus === "success") {
      setNotice("Email verified successfully. You can log in now.");
      setError("");
    } else if (verificationStatus === "invalid") {
      setError("This verification link is invalid or has already been used.");
      setNotice("");
    } else if (verificationStatus === "error") {
      setError(
        "Email verification failed. Please request a new verification email.",
      );
      setNotice("");
    }
  }, [verificationStatus]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setError("");
    setNotice("");
    setCanResendVerification(false);
    setLoginStatus("idle");
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleResendVerification = async () => {
    try {
      setIsResendingVerification(true);
      const response = await resendVerification(formData.email.trim());
      setError("");
      setNotice(response.message);
      setCanResendVerification(false);
    } catch (error) {
      setError(
        error.message ||
          "Could not resend verification email. Please try again later.",
      );
    } finally {
      setIsResendingVerification(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginStatus("idle");
    setError("");
    setNotice("");
    setCanResendVerification(false);
    // api call for backend
    try {
      const response = await login(formData);
      if (!response.success) {
        setError(response.message || "Login failed. Please try again.");
        setLoginStatus("error");
        return;
      }
      dispatch(userInfoActions.storeUserInfo(response.user));
      dispatch(isLoginActions.setLoginState({ user_id: response.user.id }));
      setCanResendVerification(false);
      setNotice("");
      setError("");
      setLoginStatus("success");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      clearStoredAuth();
      setLoginStatus("error");
      setCanResendVerification(
        err.message?.includes("Email not verified") &&
          Boolean(formData.email.trim()),
      );
      setError(err.message || "Login failed. Please try again later.");
    }
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem]">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute left-12 top-28 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-12 top-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <section className="relative px-6 pb-20 pt-32 sm:px-8 lg:px-10 lg:pb-24 lg:pt-40">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="lg:pt-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Welcome back to CityLink
            </div>

            <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Log in and continue
              <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                planning with confidence.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Access your CityLink account to continue exploring housing,
              checking matches, and moving through your student relocation plan
              without starting over.
            </p>

            <div className="mt-10 space-y-4">
              {reasons.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-5 backdrop-blur-sm"
                >
                  <div className="flex gap-4">
                    <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {title}
                      </h2>
                      <p className="mt-2 leading-7 text-slate-400">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-2xl shadow-black/20 sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
                Sign in
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white">
                Access your account.
              </h2>
              <p className="mt-3 leading-7 text-slate-400">
                Welcome back, continue your journey with CityLink.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
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

              <label className="block">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-slate-300">
                    Password
                  </span>
                  <a
                    href=""
                    className="text-sm font-medium text-indigo-300 transition hover:text-indigo-200"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/50 focus:bg-slate-950"
                />
              </label>

              {loginStatus === "success" ? (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  Login Successful! Redirecting...
                </div>
              ) : null}

              {notice ? (
                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
                  {notice}
                </div>
              ) : null}

              {errors ? (
                <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {errors}
                </div>
              ) : null}

              {canResendVerification ? (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={isResendingVerification}
                  className="w-full rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isResendingVerification
                    ? "Sending verification email..."
                    : "Resend verification email"}
                </button>
              ) : null}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Sign in
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <span>Need an account first?</span>
              <Link
                to="/signup"
                className="font-medium text-indigo-300 transition hover:text-indigo-200"
              >
                Create one here
              </Link>
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-5">
              <div className="flex gap-4">
                <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Welcome back
                  </h3>
                  <p className="mt-2 leading-7 text-slate-400">
                    Continue your journey to safe and reliable student housing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
