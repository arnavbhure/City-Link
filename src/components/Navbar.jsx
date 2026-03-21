import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-black/40 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18">
        <div className="flex items-center justify-between text-3xl">
          {/* Logo */}
          <div className="shrink-0 flex items-center  cursor-pointer group">
            <div className="relative flex items-center justify-center w-30 h-20 rounded-xl pt-4 text-white ">
              <img src="/public/citylink white.png" alt="" />
            </div>
            <span
              className="text-white text-5xl font-bold tracking-tight"
              style={{ fontFamily: "Montserrat" }}
            >
              City<span className="text-indigo-400">Link</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 h-20">
            <div className="flex space-x-13">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-300 hover:text-white font-medium transition-colors duration-200 relative group"
                  style={{ fontSize: "1.04rem" }}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-7 ml-4 pl-4 border-l border-white/10 ">
              <button
                className="hover:cursor-pointer  text-slate-100 hover:text-indigo-300 font-medium transition-colors duration-200 active:scale-95 "
                style={{ fontSize: "1.15rem" }}
              >
                {" "}
                Sign In
              </button>
              <button
                className="hover:cursor-pointer bg-indigo-600 text-lg bg-blend-color-burn hover:bg-indigo-500 text-white font-medium px-5 py-2 rounded-full border border-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-white/5 active:scale-95"
                style={{ fontSize: "1.01rem" }}
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-md hover:bg-white/5 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-96 opacity-100 bg-black/95 backdrop-blur-xl border-b border-white/10"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-3 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}

          <div className="pt-4 mt-2 border-t border-white/10 flex flex-col space-y-3">
            <button
              className="text-lg w-full text-center px-4 py-3 text-slate-300 hover:text-white font-medium rounded-md hover:bg-white/5 transition-colors duration-200 active:scale-95"
              onClick={() => {
                alert("Clicked ");
              }}
            >
              Sign in
            </button>
            <button className="w-full text-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors duration-200 active:scale-95">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
