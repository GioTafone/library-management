import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { fetchUsersThunk } from "redux/slices/userSlice";
import Navbar from "components/Navbar";
import DashboardTabs from "components/DashboardTabs";

const UserTab = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state);

  console.log(users);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  return (
    <div>
      <Navbar adminText={<Link to="/">Go Back</Link>} />
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <DashboardTabs />
        <h1>Users coming soon!</h1>
      </div>
    </div>
  );
};

export default UserTab;
