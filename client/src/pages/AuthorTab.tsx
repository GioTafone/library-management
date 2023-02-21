import { Link } from "react-router-dom";
import uuid from "react-uuid";

import { useAppSelector } from "redux/hooks";
import Navbar from "components/Navbar";
import DashboardTabs from "components/DashboardTabs";
import AddAuthorModal from "components/AddAuthorModal";
import AdminAuthorsDisplay from "components/AdminAuthorsDisplay";

const AuthorTab = () => {
  const { authors } = useAppSelector((state) => state);

  return (
    <div>
      <Navbar adminText={<Link to="/">Go Back</Link>} />
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col w-[200px]">
          <DashboardTabs />
          <AddAuthorModal />
        </div>
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-4 gap-20 p-10">
          {authors.items.map((author) => {
            return (
              <div key={uuid()}>
                <AdminAuthorsDisplay
                  _id={author._id}
                  firstName={author.firstName}
                  lastName={author.lastName}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthorTab;
