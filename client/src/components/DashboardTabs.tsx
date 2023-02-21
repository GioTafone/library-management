import { Link } from "react-router-dom";

import { useAppDispatch } from "redux/hooks";
import { fetchBooksThunk } from "redux/asyncThunks/bookThunks";
import { fetchAuthorThunk } from "redux/asyncThunks/authorThunks";

const DashboardTabs = () => {
  const dispatch = useAppDispatch();

  const fecthBooks = () => {
    dispatch(fetchBooksThunk());
  };

  const fetchAuthors = () => {
    dispatch(fetchAuthorThunk());
  }

  return (
    <div className="flex flex-col w-[200px] py-10">
      {" "}
      <Link to={"/admin/dashboard/books"}>
        <button
          onClick={fecthBooks}
          className="bg-primaryOrange text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-2 ease-linear transition-all duration-250 w-[80%] m-4"
        >
          Books
        </button>
      </Link>
      <br />
      <Link to={"/admin/dashboard/authors"}>
        <button
          onClick={fetchAuthors}
          className="bg-primaryOrange text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-2 ease-linear transition-all duration-250 w-[80%] m-4"
        >
          Authors
        </button>
      </Link>
      <br />
      <Link to={"/admin/dashboard/users"}>
        <button className="bg-primaryOrange text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-2 ease-linear transition-all duration-250 w-[80%] m-4">
          Users
        </button>
      </Link>
    </div>
  );
};

export default DashboardTabs;
