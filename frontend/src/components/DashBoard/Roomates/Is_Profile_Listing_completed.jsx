import { ArrowRight } from "lucide-react";

const Is_Profile_Listing_completed = ({ is_profile_completed }) => {
  return (
    <>
      {!is_profile_completed && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Complete Your Profile so others can see your Profile below
          </h2>
          <div className="shrink-0">
            <a
              href="/complete-profile"
              className="hover:cursor-pointer inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-4 py-2 text-sm text-black transition-transform duration-300 hover:scale-105"
            >
              Complete Profile <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Is_Profile_Listing_completed;
