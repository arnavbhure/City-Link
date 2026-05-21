import { ArrowRight, Bell, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { getFirstName } from "./dashboardData";

const DashboardHeader = ({ user }) => {
  return (
    <header className="grid gap-5 rounded-[1.5rem] border border-white/10 bg-slate-900/[0.72] p-5 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
      <div>
        <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
          Welcome back,{" "}
          <span className="text-indigo-200">{getFirstName(user)}</span>
        </h1>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
        <Link
          to="/dashboard/explore-roomates"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-slate-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-indigo-100"
        >
          Explore matches
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/dashboard/explore-housing"
          className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.1]"
        >
          Browse housing
        </Link>
      </div>
    </header>
  );
};

export default DashboardHeader;
