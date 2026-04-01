import { createElement, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  CircleUserRound,
  House,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const navigationItems = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    to: "/dashboard",
    tone: "indigo",
  },
  {
    icon: House,
    title: "Home",
    to: "/",
    tone: "cyan",
  },
  {
    icon: LifeBuoy,
    title: "Contact",
    to: "/contact",
    tone: "violet",
  },
];

const iconToneClasses = {
  indigo: "border-indigo-400/20 bg-indigo-500/10 text-indigo-300",
  cyan: "border-cyan-400/20 bg-cyan-500/10 text-cyan-300",
  violet: "border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300",
};

const MenuAction = ({ icon, title, tone, onClick, destructive = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-[1rem] px-3 py-2.5 text-left transition duration-200 ${
        destructive ? "hover:bg-red-500/10" : "hover:bg-white/5"
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
          destructive
            ? "border-red-400/20 bg-red-500/10 text-red-300"
            : iconToneClasses[tone]
        }`}
      >
        {createElement(icon, { className: "h-5 w-5" })}
      </div>

      <p
        className={`min-w-0 flex-1 text-sm font-medium transition ${
          destructive
            ? "text-red-300 group-hover:text-red-200"
            : "text-white group-hover:text-indigo-200"
        }`}
      >
        {title}
      </p>
    </button>
  );
};

const ProfileDropdown = ({ handleOnLogout }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleNavigate = (to) => {
    setOpen(false);
    navigate(to);
  };

  const handleLogoutClick = () => {
    setOpen(false);
    handleOnLogout();
  };

  return (
    <div className="relative inline-flex" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 pr-2.5 text-left backdrop-blur-sm transition duration-200 hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-black/10 sm:gap-3 sm:px-2.5 sm:py-2 sm:pr-3"
      >
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] sm:h-10 sm:w-10">
          <CircleUserRound className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
        </div>

        <div className="hidden min-w-0 sm:block">
          <p className="text-sm font-semibold text-white">Account</p>
          <p className="mt-0.5 text-xs text-slate-400">Menu</p>
        </div>

        <ChevronDown
          className={`h-4 w-4 text-slate-400 transition duration-200 ${
            open ? "rotate-180 text-white" : "group-hover:text-white"
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2.5 w-[min(15rem,calc(100vw-1rem))] overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-900/95 p-2 shadow-[0_24px_60px_rgba(2,6,23,0.5)] backdrop-blur-xl sm:mt-3 sm:w-64">
          <div className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-3 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-white">
                <CircleUserRound className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">
                  CityLink account
                </p>
                <p className="mt-0.5 text-xs text-slate-400">Signed in</p>
              </div>
            </div>
          </div>

          <div className="mt-2 space-y-1">
            {navigationItems.map((item) => (
              <MenuAction
                key={item.title}
                {...item}
                onClick={() => handleNavigate(item.to)}
              />
            ))}
          </div>

          <div className="my-2 border-t border-white/10" />
          <MenuAction
            icon={LogOut}
            title="Log out"
            onClick={handleLogoutClick}
            destructive
          />
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
