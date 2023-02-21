import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  fetchBookByIsbnThunk,
  borrowBookThunk,
} from "redux/asyncThunks/bookThunks";
import { postUserCredentialThunk } from "redux/slices/authSlice";
import Navbar from "components/Navbar";
import BookDetails from "components/BookDetails";
import Popup from "components/Popup";

const BookPage = () => {
  const navigate = useNavigate();
  const { isbn } = useParams<{ isbn: string }>();
  const dispatch = useAppDispatch();
  const { books, auth } = useAppSelector((state) => state);

  const token = auth.token;
  const userId = auth.decoded.userId;
  const book = books.itemsRef[0];
  const [popUp, setPopup] = useState(false)

  const handleGoogleOnSuccess = (res: CredentialResponse) => {
    dispatch(postUserCredentialThunk(res));
  };

  useEffect(() => {
    dispatch(fetchBookByIsbnThunk({ isbn, token }));
  }, [dispatch, isbn, token]);

  
  const handlePopup = () => {
    setPopup(prevState => !prevState)
    dispatch(fetchBookByIsbnThunk({ isbn, token }));
  }
  const borrowBook = () => {
    const bookId = books.itemsRef[0]._id;
    dispatch(borrowBookThunk({ bookId, userId, token }));
    handlePopup()
  };


  return (
    <>
      <Navbar userText={<Link to="/">Go Back</Link>} />
      {popUp ? (
        <Popup
          handlePopup={handlePopup}
          text={book.title}
          content="added to your collection"
        />
      ) : null}
      <div className="md:grid grid-cols-6 gap-7">
        <div className="col-span-1">
          <div className="flex flex-col m-8">
            {book && book.isAvailable ? (
              <button onClick={borrowBook}>
                <p className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-primaryWhite bg-primaryOrange shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-2 ease-linear transition-all duration-250">
                  BORROW
                </p>
              </button>
            ) : (
              <p className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-primaryWhite bg-primaryOrange shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-2 ease-linear transition-all duration-250">
                Not Available - On hold
              </p>
            )}
          </div>
        </div>
        <div className="col-span-4 flex justify-center w-2/3 border">
          {!auth.token ? (
            <div>
              <GoogleLogin
                onSuccess={handleGoogleOnSuccess}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              <h1>
                or go{" "}
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  {" "}
                  BACK
                </button>
              </h1>
            </div>
          ) : (
            book && (
              <BookDetails
                title={book.title}
                authors={book.authors}
                isbn={book.isbn}
                publisher={book.publisher}
                description={book.description}
                publishedYear={book.publishedYear}
                category={book.category}
                isAvailable={book.isAvailable}
              />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default BookPage;
