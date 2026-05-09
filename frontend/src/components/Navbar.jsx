import { useEffect, useState } from "react";
import { Menu, Store, X } from "lucide-react";
import { useSelector } from "react-redux";
import {
  IsLoggedInMobile,
  IsLoggedInDesktop,
  LoggedInUserMenu,
} from "./auth/isLogin";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();
  const isLogin = useSelector((state) => state.isLoggedIn.isLogin);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsMobileMenuOpen(false);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [location.pathname, location.hash, isLogin]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "#features" },
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contactus" },
  ];

  const vendorCta =
    "inline-flex items-center justify-center gap-2 rounded-full border border-indigo-300/25 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-indigo-100 shadow-lg shadow-indigo-950/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200/45 hover:bg-indigo-400/10 hover:text-white active:translate-y-0";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-black/40 backdrop-blur-md border-b border-white/10 py-2.5 sm:py-3"
          : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 px-3 sm:h-18 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between text-3xl">
          <div className="shrink-0 flex items-center cursor-pointer group">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-xl pt-2 text-white sm:h-24 sm:w-24 sm:pt-4">
              <Link to="/">
                <img
                  src="/citylink white.png"
                  alt="CityLink logo"
                  className="h-16 w-16 object-contain sm:h-24 sm:w-24"
                />
              </Link>
            </div>
            <span
              className="text-[2.55rem] font-bold tracking-tight text-white sm:text-5xl"
              style={{ fontFamily: "Montserrat" }}
            >
              <Link to="/">
                {" "}
                City<span className="text-indigo-400">Link</span>
              </Link>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8 h-20">
            <div className="flex space-x-13">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-slate-300 hover:text-white font-medium transition-colors duration-200 relative group"
                  style={{ fontSize: "1.04rem" }}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            <Link to="/vendor/onboarding" className={vendorCta}>
              <Store className="h-4 w-4" />
              List Your Service
            </Link>

            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-white/10">
              <IsLoggedInDesktop />
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/vendor/onboarding"
              className="hidden min-[430px]:inline-flex items-center justify-center gap-1.5 rounded-full border border-indigo-300/25 bg-white/[0.05] px-3 py-2 text-xs font-semibold text-indigo-100 backdrop-blur-sm transition hover:bg-indigo-400/10"
            >
              <Store className="h-3.5 w-3.5" />
              List Service
            </Link>
            {isLogin ? (
              <LoggedInUserMenu />
            ) : (
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-md p-2 text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {!isLogin && (
        <div
          className={`md:hidden absolute top-full left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-120 opacity-100 bg-black/95 backdrop-blur-xl border-b border-white/10"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pt-2 pb-6 space-y-1 shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/vendor/onboarding"
              className="mt-2 flex items-center justify-center gap-2 rounded-2xl border border-indigo-300/25 bg-indigo-400/10 px-4 py-3 font-semibold text-indigo-100 transition hover:bg-indigo-400/15"
            >
              <Store className="h-4 w-4" />
              List Your Service
            </Link>

            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col space-y-3">
              <IsLoggedInMobile />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
