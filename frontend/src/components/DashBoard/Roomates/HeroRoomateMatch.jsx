import { Link } from "react-router-dom";

const HeroRoomateMatch = () => {
  return (
    <section className="ml-3 mr-3 mb-9 text-center rounded-[1.6rem] border border-white/10 bg-slate-900/70 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8 ">
      <div>
        <h1 className="mt-5 text-[2.15rem] font-black leading-none tracking-tight text-white sm:mt-6 sm:text-5xl">
          Find students who feel
          <span className="block bg-linear-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
            easier to live with.
          </span>
        </h1>

        <p className="text-center mt-4 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Filter by city, budget, move timing, and lifestyle so the next
          conversation starts with stronger compatibility.
        </p>

        <div className="text-center mt-6  gap-3 sm:mt-8 sm:flex-row ">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroRoomateMatch;
