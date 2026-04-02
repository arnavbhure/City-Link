import { useEffect } from "react";
import { useDispatch } from "react-redux";
import loadUserInfo from "../../utils/loadUserInfo";
import { userInfoActions } from "../../store/user/userSlice";
import FeedCardsDisplay from "./FeedCard";
import ActionCards from "./ActionCards";
import DashBoardHero from "./DashboardHero";

const DashBoard = () => {
  const dispatch = useDispatch();
  // useEffect for getting user info after user refreshes page
  useEffect(() => {
    const fetchUser = async () => {
      const user = await loadUserInfo();
      if (user) {
        dispatch(userInfoActions.storeUserInfo(user));
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-104">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/18 blur-3xl" />
        <div className="absolute left-8 top-28 h-56 w-56 rounded-full bg-cyan-400/8 blur-3xl" />
        <div className="absolute right-10 top-24 h-64 w-64 rounded-full bg-fuchsia-500/8 blur-3xl" />
      </div>

      <section className="relative px-4 pb-14 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-7xl space-y-5 sm:space-y-8">
          <DashBoardHero />
          <ActionCards />
          <FeedCardsDisplay />
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
