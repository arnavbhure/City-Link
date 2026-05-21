import { createElement } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, MapPin } from "lucide-react";
import { getProfileCompletion, getWorkspaceLinks } from "./dashboardData";

const DashboardSidebar = ({ user }) => {
  const profileCompletion = getProfileCompletion(user);
  const workspaceLinks = getWorkspaceLinks(user);

  return (
    <aside className="rounded-[1.4rem] border border-white/10 bg-slate-900/[0.72] p-4 shadow-xl shadow-black/20 backdrop-blur-xl lg:sticky lg:top-28">
      <div className="rounded-[1.1rem] border border-white/10 bg-slate-950/60 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 via-violet-400 to-cyan-300 text-base font-black text-slate-950">
            {(user.full_name || "CL")
              .split(" ")
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-white">
              {user.full_name || "CityLink student"}
            </p>
            <p className="mt-1 truncate text-xs text-slate-400">
              {user.email || "Signed in"}
            </p>
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-indigo-300 transition-all duration-500"
            style={{ width: `${profileCompletion}%` }}
          />
        </div>
        <p className="mt-2 text-xs font-semibold text-slate-400">
          {profileCompletion}% profile readiness
        </p>
      </div>

      <nav className="mt-4 space-y-1.5">
        {workspaceLinks.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition ${
              item.active
                ? "bg-indigo-300 text-slate-950"
                : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {createElement(item.icon, {
              className: "h-4 w-4 shrink-0",
            })}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
        <div className="flex items-start gap-3 text-sm">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-indigo-200" />
          <div>
            <p className="font-semibold text-white">{user.city || "City not set"}</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Used for housing and roommate relevance.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
          <div>
            <p className="font-semibold text-white">
              {user.college || "College not set"}
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Add academic context to your profile.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
