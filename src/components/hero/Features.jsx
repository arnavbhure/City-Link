const Features = () => {
  const features = [
    {
      title: "Find Verified Roommates",
      description: "Connect with students and match preferences easily.",
    },
    {
      title: "Discover Trusted Housing",
      description: "Browse verified PGs, flats, and rentals near your campus.",
    },
    {
      title: "Built-in Student Community",
      description: "Join a network of students for help and connections.",
    },
    {
      title: "Verified Listings",
      description:
        "All listings are reviewed by students to ensure trust and safety.",
    },
    {
      title: "Local Services",
      description:
        "Find food, laundry, and essentials recommended by students.",
    },
    {
      title: "Senior Guidance",
      description:
        "Get help and advice from seniors already in your destination city.",
    },
  ];

  return (
    <>
      <section
        className="py-20 border-t border-white/5 bg-slate-900/50"
        id="features"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6 border border-indigo-500/30">
                  <div className="w-6 h-6 bg-indigo-400 rounded-sm"></div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Move to a New City with Confidence
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            From finding the right roommate to settling into your new
            environment, CityLink makes every step simple, safe, and
            student-driven.
          </p>
          <div className="max-w-3xl mx-auto p-16 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
            <p className="text-slate-300 text-lg mb-6">
              Ready to find your perfect roommate and home?
            </p>

            <a
              href="/signup"
              className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition hover:cursor-pointer"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
