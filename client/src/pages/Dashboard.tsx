import { Link } from "react-router-dom";

import Navbar from "components/Navbar";
import DashboardTabs from "components/DashboardTabs";

const Dashboard = () => {
  return (
    <div>
      <Navbar adminText={<Link to="/">Go Back</Link>} />
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <DashboardTabs />
      </div>
    </div>
  );
};

export default Dashboard;
