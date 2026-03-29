import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-900/80">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-20 md:grid-cols-4">
          <div>
            <div className="shrink-0 flex items-center cursor-pointer group">
              <div className="relative flex items-center justify-center h-20 rounded-xl pt-4 text-white">
                <a href="/">
                  <img
                    src="/citylink white.png"
                    alt="CityLink logo"
                    className="w-15 h-15 object-contain theme-logo-image"
                  />
                </a>
              </div>
              <span
                className="text-white text-2xl font-bold tracking-tight"
                style={{ fontFamily: "Montserrat" }}
              >
                <a href="/">
                  {" "}
                  City<span className="text-indigo-400">Link</span>
                </a>
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Helping students find roommates, housing, and community when
              moving to a new city.
            </p>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-white">Product</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="cursor-pointer hover:text-white">
                Find Roommates
              </li>
              <li className="cursor-pointer hover:text-white">
                Browse Housing
              </li>
              <li className="cursor-pointer hover:text-white">Community</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li className="cursor-pointer hover:text-white">Careers</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a
                  href="/legal#privacy"
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/legal#terms"
                  className="transition-colors hover:text-white"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} CityLink. All rights reserved.
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-400">
            <span className="text-slate-400">Made with</span>

            {/* The heart uses the theme accent color (indigo) */}
            <Heart className="w-4 h-4 text-indigo-400" />

            <span className="text-white font-medium">
              by ~
              <a
                href="https://www.linkedin.com/in/arnavbhure/"
                target="_blank"
                className="text-indigo-100 hover:text-indigo-300"
              >
                arnavbhure
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
