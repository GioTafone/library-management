import { useEffect } from "react";
import uuid from "react-uuid";

// import { Author } from "types";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { fetchBooksThunk } from "redux/asyncThunks/bookThunks";
import BookCard from "components/BookCard";

const DisplayBooks = () => {
  const { books } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);

  console.log(books)

  return (
    <div className="col-span-4 mr-10">
      <div className="md:grid grid-cols-3">
        {books && books.items.map((book) => {
          return (
            <div key={uuid()} className="bg-bookPage m-5 max-w-[300px]">
              <BookCard
                title={book.title}
                authors={book.authors}
                category={book && book.category}
                isbn={book && book.isbn}
                isAvailable={book && book.isAvailable}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayBooks;
