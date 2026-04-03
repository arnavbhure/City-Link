import ActionCards from "./ActionCards";
import DashBoardHero from "./DashboardHero";

const DashBoard = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative px-4 pb-14 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-7xl space-y-5 sm:space-y-8">
          <DashBoardHero />
          <ActionCards />
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
