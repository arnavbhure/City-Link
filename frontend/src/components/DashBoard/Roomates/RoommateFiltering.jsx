import { Search } from "lucide-react";

const filterOptions = {
  budget: ["Any budget", "Under INR 10k", "INR 10k - 15k", "INR 15k+"],
  move: ["Any time", "Flexible"],
  lifestyle: ["Any lifestyle", "Quiet", "Balanced", "Social"],
};

const RoommateFiltering = ({ filteredProfiles, filters, setFilters }) => {
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  };
  return (
    <>
      <section className="grid gap-5 ">
        <div className="rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300 sm:text-sm">
                Match filters
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Narrow the list fast
              </h2>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              <Search className="h-4 w-4 text-indigo-300" />
              {filteredProfiles.length} potential matches
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">
                Budget
              </span>
              <select
                name="budget"
                value={filters.budget}
                onChange={handleFilterChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-indigo-400/50 focus:bg-slate-950"
              >
                {filterOptions.budget.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">
                Move timing
              </span>
              <select
                name="move"
                value={filters.move}
                onChange={handleFilterChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-indigo-400/50 focus:bg-slate-950"
              >
                {filterOptions.move.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">
                Lifestyle
              </span>
              <select
                name="lifestyle"
                value={filters.lifestyle}
                onChange={handleFilterChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-indigo-400/50 focus:bg-slate-950"
              >
                {filterOptions.lifestyle.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() => setFilters(initialFilters)}
              className="w-50 hover:cursor-pointer mt-6 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Reset filters
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default RoommateFiltering;
