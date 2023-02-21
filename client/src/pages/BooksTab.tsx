import { Link } from "react-router-dom";
import uuid from "react-uuid";

import { useAppSelector } from "redux/hooks";
import Navbar from "components/Navbar";
import DashboardTabs from "components/DashboardTabs";
import AdminBooksDisplay from "components/AdminBooksDisplay";
import AddBookModal from "components/AddBookModal";

const BooksTab = () => {
  const { books } = useAppSelector((state) => state);

  return (
    <>
      <Navbar adminText={<Link to="/">Go Back</Link>} />
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col w-[200px]">
          <DashboardTabs />
          <AddBookModal />
        </div>
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-10 p-10">
          {books.items.map((book) => {
            return (
              <div key={uuid()}>
                <AdminBooksDisplay
                  _id={book._id}
                  title={book.title}
                  isbn={book.isbn}
                  isAvailable={book.isAvailable}
                  authors={book.authors}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BooksTab;
