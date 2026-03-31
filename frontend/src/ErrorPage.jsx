import { createElement } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Compass,
  Home,
  LifeBuoy,
  MapPinned,
  Search,
  Users,
} from "lucide-react";
import {
  Link,
  isRouteErrorResponse,
  useLocation,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const recoveryLinks = [
  {
    icon: Home,
    title: "Go back to the homepage",
    description:
      "Restart your CityLink journey from the main landing page and explore the product again.",
    to: "/",
    cta: "Open home",
  },
  {
    icon: Search,
    title: "Browse what CityLink offers",
    description:
      "Jump into the main experience and explore housing, matching, and student move planning.",
    to: "/#features",
    cta: "See features",
  },
  {
    icon: LifeBuoy,
    title: "Reach out for support",
    description:
      "If the route should exist, our contact page gives you a clear next step to report it.",
    to: "/contact",
    cta: "Contact us",
  },
];

function getErrorContent(error) {
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return {
        code: "404",
        badge: "Page not found",
        title: "This page took a wrong turn.",
        description:
          "The route you tried does not exist anymore, or the link was incomplete. The rest of CityLink is still ready for you.",
      };
    }

    return {
      code: String(error.status),
      badge: error.statusText || "Route error",
      title: "Something interrupted this route.",
      description:
        "We could not load this page correctly right now. Try a safer path below and continue from there.",
    };
  }

  if (error instanceof Error) {
    return {
      code: "500",
      badge: "Unexpected error",
      title: "Something broke before this page could load.",
      description:
        error.message ||
        "A rendering issue stopped this screen from opening, but you can still navigate back into the product.",
    };
  }

  return {
    code: "404",
    badge: "Not available",
    title: "This page is not available right now.",
    description:
      "The link is either outdated or still under construction. Use one of the routes below to keep moving.",
  };
}

function ErrorPageLayout({ embedded = false, error = null }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { code, badge, title, description } = getErrorContent(error);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  const backgroundGlow = (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem]">
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute left-12 top-28 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute right-12 top-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
    </div>
  );

  const content = (
    <section
      className={`relative px-6 pb-20 sm:px-8 lg:px-10 ${
        embedded ? "pt-32 lg:pt-40" : "pt-14 lg:pt-20"
      }`}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300 backdrop-blur-sm">
            <Compass className="h-4 w-4" />
            {badge}
          </div>

          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-3 text-amber-300">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                Requested route
              </p>
              <p className="mt-1 text-sm text-slate-300">
                {location.pathname || "/"}
              </p>
            </div>
          </div>

          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
            <span className="mt-2 block bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              Let&apos;s get you back on track.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            {description}
          </p>

          <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-5 backdrop-blur-sm">
            <div className="flex gap-4">
              <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Keep moving without losing momentum
                </h2>
                <p className="mt-2 leading-7 text-slate-400">
                  Head back to home, browse the product, or reach support if
                  this route should be working.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Back to home
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={handleGoBack}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Go back
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-500/15 via-white/5 to-cyan-400/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-10">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">
                  Error code
                </p>
                <h2 className="mt-4 text-6xl font-black tracking-tight text-white sm:text-7xl">
                  {code}
                </h2>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 text-indigo-300">
                <MapPinned className="h-8 w-8" />
              </div>
            </div>

            <p className="mt-6 max-w-lg leading-7 text-slate-300">
              CityLink should always make the next step obvious. This screen is
              here to recover fast, not leave you stuck.
            </p>
          </div>

          <div className="grid gap-4">
            {recoveryLinks.map(
              ({ icon: Icon, title, description, to, cta }) => (
                <Link
                  key={title}
                  to={to}
                  className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:bg-white/10"
                >
                  <div className="flex gap-4">
                    <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-3 text-indigo-300">
                      {createElement(Icon, { className: "h-5 w-5" })}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-white">
                        {title}
                      </h3>
                      <p className="mt-2 leading-7 text-slate-400">
                        {description}
                      </p>
                      <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300">
                        {cta}
                        <ArrowRight className="h-4 w-4" />
                      </p>
                    </div>
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );

  if (embedded) {
    return (
      <div className="relative overflow-hidden bg-slate-950 text-white">
        {backgroundGlow}
        {content}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {backgroundGlow}

      <header className="relative px-6 pt-6 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/citylink white.png"
              alt="CityLink logo"
              className="h-10 w-10 object-contain"
            />
            <span
              className="text-2xl font-bold tracking-tight text-white"
              style={{ fontFamily: "Montserrat" }}
            >
              City<span className="text-indigo-400">Link</span>
            </span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Back to home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {content}
    </div>
  );
}

export function RouteErrorBoundary() {
  const error = useRouteError();
  return <ErrorPageLayout error={error} />;
}

const ErrorPage = ({ embedded = false }) => {
  return <ErrorPageLayout embedded={embedded} />;
};

export default ErrorPage;
