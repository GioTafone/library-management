import { useEffect } from "react";
import { Link } from "react-router-dom";
import uuid from "react-uuid";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  fecthUserBorrowsThunk,
  returnBookThunk,
} from "redux/asyncThunks/bookThunks";
import { Book } from "types";
import Navbar from "components/Navbar";

const UserDashboard = () => {
  const dispatch = useAppDispatch();
  const { books, auth } = useAppSelector((state) => state);

  const userId = auth.decoded.userId;
  const booksUser = books.booksUser;

  const noBooks = booksUser.length
  console.log(noBooks)

  console.log(booksUser);

  useEffect(() => {
    if (userId) {
      dispatch(fecthUserBorrowsThunk(userId));
    }
  }, [dispatch, userId]);

  const returnBook = (bookId: string) => {
    dispatch(returnBookThunk(bookId));
    dispatch(fecthUserBorrowsThunk(userId));
  };

  return (
    <div>
      <Navbar userText={<Link to="/">Go Back</Link>} />
      <div className="m-5 text-center bg-secondaryZinc p-6 font-extrabold rounded-sm shadow-2xl shadow-gray">
        <h3 className="text-2xl text-primaryBlue">Your Books</h3>
      </div>
      {noBooks <= 0 ? (
        <div className="m-5 text-center bg-secondaryZinc p-6 font-extrabold rounded-sm shadow-2xl shadow-gray h-[450px] font-BookFont flex justify-center items-center">
          <h3 className="mb-2 text-xl font-bold">No Books</h3>
        </div>
      ) : (
        booksUser.map((book: Book) => {
          return (
            <>
              <div className="flex" key={uuid()}>
                <div className="m-6 p-6 flex flex-col bg-primaryWhite rounded-sm shadow-2xl shadow-gray w-10/12 font-BookFont max-w-[350px]">
                  <h4 className="mb-2 text-xl font-bold text-center uppercase">
                    {book.title}
                  </h4>
                  <button
                    className="bg-primaryOrange text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-2 ease-linear transition-all duration-250"
                    onClick={() => returnBook(book._id!)}
                  >
                    Return Book
                  </button>
                </div>
              </div>
            </>
          );
        })
      )}
    </div>
  );
};

export default UserDashboard;
