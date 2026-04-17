import HouseListing from "./HouseListing";
import HeroHouseListing from "./HeroHouseListing";

const ExploreHousing = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative px-4 pb-16 pt-28 sm:px-8 sm:pb-18 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
          <HeroHouseListing />
          <HouseListing />
        </div>
      </section>
    </div>
  );
};

export default ExploreHousing;
