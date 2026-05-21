import SectionCard from "./SectionCard";
import StatCard from "./StatCard";
import { getDashboardStats } from "./dashboardData";

const DashboardStats = ({ user }) => {
  const stats = getDashboardStats(user);

  return (
    <SectionCard
      eyebrow="Status"
      title="Your CityLink snapshot"
      description="A quick read on what the app already knows about your setup."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </SectionCard>
  );
};

export default DashboardStats;
