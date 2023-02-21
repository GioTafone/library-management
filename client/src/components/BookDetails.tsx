import { Book } from "types";
import { IoCloseCircle, IoCheckmarkCircle } from "react-icons/io5";

const BookDetails = ({
  isbn,
  title,
  authors,
  description,
  publishedYear,
  isAvailable,
  publisher,
  category
}: Book) => {
  return (
    <div className="m-6 p-6 min-w-sm bg-primaryZinc rounded-sm border border-gray-200 shadow-md font-BookFont">
      <a href="/">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-primaryBlue p-8 uppercase">
          {title}
        </h3>
      </a>
      <>
        {authors?.map((author) => {
          return (
            <div>
              <p>Written by:</p>
              <p>
                {author.firstName} {author.lastName}
              </p>
            </div>
          );
        })}
      </>
      <p className="mb-3 font-normal text-gray-700">{description}</p>
      <p className="mb-3 font-normal text-gray-700 px-8 pt-4">ISBN: {isbn}</p>
      <p className="mb-3 font-normal text-gray-700 px-8 pt-4">
        Publisher Year: {publishedYear}
      </p>
      <p className="mb-3 font-normal text-gray-700 px-8 pt-4 uppercase">
        Publisher: {publisher}
      </p>
      <p className="mb-3 font-normal text-gray-700 px-8 pt-4">
        Category: {category}
      </p>
      <div className="flex">
        <p className="pt-3 pr-2 pl-8 text-lg font-bold text-primaryBlue">
          Available
        </p>
        <p className="p-3">
          {isAvailable ? (
            <IoCheckmarkCircle className="text-green-700" size="25px" />
          ) : (
            <IoCloseCircle className="text-red-900" size="25px" />
          )}
        </p>
      </div>
    </div>
  );
};
export default BookDetails;
