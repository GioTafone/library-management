import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  deleteAuthorThunk,
  fetchAuthorById,
} from "redux/asyncThunks/authorThunks";
import AuthorDetails from "components/AuthorDetails";
import Navbar from "components/Navbar";
import EditAuthorModal from "components/EditAuthorModal";
import Popup from "components/Popup";

const AdminBookDetails = () => {
  const { _id } = useParams<{ _id: string }>();
  const dispatch = useAppDispatch();
  const { authors } = useAppSelector((state) => state);
  const author = authors.items.find((author) => author._id === _id);
  const [popUp, setPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAuthorById(_id!));
  }, [dispatch, _id]);

  const handlePopup = () => {
    setPopup((prevState) => !prevState);
  };
  const deleteAuthor = (id: string) => {
    dispatch(deleteAuthorThunk(id));
    handlePopup();
    navigate("/admin/dashboard");
  };

  return (
    <>
      <Navbar
        adminText={<Link to="/admin/dashboard">Go Back</Link>}
      />
      {popUp ? (
        <Popup
          handlePopup={() => deleteAuthor(_id!)}
          text={author?.lastName}
          content="has been deleted"
        />
      ) : null}
      <div className="md:grid grid-cols-6 gap-7">
        <div className="col-span-1">
          <div className="flex flex-col m-8">
            <button
              onClick={() => deleteAuthor(_id!)}
              className="bg-primaryOrange text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-2 ease-linear transition-all duration-250"
            >
              Delete
            </button>
            <EditAuthorModal
              _id={author?._id}
              firstName={author?.firstName}
              lastName={author?.lastName}
            />
          </div>
        </div>
        <div className="col-span-4 flex justify-center w-2/3 border">
          {authors && (
            <AuthorDetails
              firstName={authors.itemsRef?.firstName}
              lastName={authors.itemsRef?.lastName}
              //@ts-ignore
              books={
                authors.itemsRef.books ? (
                  <p>{authors.itemsRef?.books[0]?.title}</p>
                ) : (
                  <p>No Books</p>
                )
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AdminBookDetails;
