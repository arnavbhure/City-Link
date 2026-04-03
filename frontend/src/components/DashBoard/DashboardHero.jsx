import { useSelector } from "react-redux";
import { Sparkles } from "lucide-react";

const DashBoardHero = () => {
  const user = useSelector((state) => state.user);
  return (
    <>
      <section className="rounded-[1.6rem] border border-white/10 bg-slate-900/70 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-indigo-300">
          <Sparkles className="h-4 w-4" />
          CityLink dashboard
        </div>

        <h1 className="mt-5 text-[2.1rem] font-black leading-none tracking-tight text-white sm:mt-6 sm:text-5xl">
          Welcome back,{" "}
          <span className="text-indigo-300">
            {user.full_name?.split(" ")[0]}
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Pick one action and move closer to your next room today.
        </p>
      </section>
    </>
  );
};

export default DashBoardHero;
