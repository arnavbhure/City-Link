const Heading = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-[100px] rounded-full mix-blend-screen transform -translate-y-1/2 scale-150"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="inline-flex items-center px-3 py-1 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-indigo-300">
          <span className="flex w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
          Introducing CityLink – Your Student Community Hub
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Find Your People,
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Find Your Place.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
          Discover verified roommates, trusted housing, and community-powered
          services — all in one platform built for students moving to a new
          city.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-slate-200 transition-colors duration-200">
            Get Started
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/10 backdrop-blur-sm transition-all duration-200">
            Explore Community
          </button>
        </div>
      </div>
    </section>
  );
};
export default Heading;
