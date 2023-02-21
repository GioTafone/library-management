import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { deleteBookThunk } from "redux/asyncThunks/bookThunks";
import BookDetails from "components/BookDetails";
import Navbar from "components/Navbar";
import EditBookModal from "components/EditBookModal";
import Popup from "components/Popup";

const AdminBookDetails = () => {
  const { _id } = useParams<{ _id: string }>();
  const dispatch = useAppDispatch();
  const { books } = useAppSelector((state) => state);
  const book = books.items.find((book) => book._id === _id);

  const [popUp, setPopup] = useState(false);
  const navigate = useNavigate();

  const handlePopup = () => {
    setPopup((prevState) => !prevState);
  };

  const deleteBook = (id: string) => {
    dispatch(deleteBookThunk(id));
    handlePopup();
    navigate("/admin/dashboard");
  };

  return (
    <>
      {/* <h1>AdminBookDetails</h1>{" "} */}
      <Navbar
        adminText={<Link to="/admin/dashboard">Go Back</Link>}
      />
      {popUp ? (
        <Popup
          handlePopup={() => deleteBook(_id!)}
          text={book?.title}
          content="has been deleted"
        />
      ) : null}
      <div className="md:grid grid-cols-6 gap-7">
        <div className="col-span-1">
          <div className="flex flex-col m-8">
            <button
              onClick={handlePopup}
              className="bg-primaryOrange text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-2 ease-linear transition-all duration-250"
            >
              Delete
            </button>
            <EditBookModal
              _id={book?._id}
              isbn={book?.isbn}
              title={book?.title}
              description={book?.description}
              publisher={book?.publisher}
              publishedYear={book?.publishedYear}
              category={book?.category}
            />
          </div>
        </div>
        <div className="col-span-4 flex justify-center w-2/3 border">
          {book && (
            <BookDetails
              title={book.title}
              authors={book.authors}
              description={book.description}
              publishedYear={book.publishedYear}
              isAvailable={book.isAvailable}
              isbn={book.isbn}
              publisher={book.publisher}
              category={book.category}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminBookDetails;
