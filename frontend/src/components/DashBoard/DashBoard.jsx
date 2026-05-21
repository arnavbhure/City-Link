import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import ActionCards from "./ActionCards";
import DashboardAurora from "./DashboardAurora";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardStats from "./DashboardStats";
import ReadinessChecklist from "./ReadinessChecklist";

const MotionDiv = motion.div;

const DashBoard = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <DashboardAurora />
      <section className="relative px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pt-36">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <MotionDiv
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28 }}
          >
            <DashboardSidebar user={user} />
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: 0.05 }}
            className="min-w-0 space-y-5"
          >
            <DashboardHeader user={user} />
            <DashboardStats user={user} />
            <ActionCards user={user} />

            <div>
              <ReadinessChecklist user={user} />
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
};

export default DashBoard;
