import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoCloseCircle, IoCheckmarkCircle } from "react-icons/io5";

import { useAppSelector } from "redux/hooks";
import { Book } from "types";

const BookCard = ({ title, authors, isbn, category, isAvailable }: Book) => {
  const { auth } = useAppSelector((state) => state);

  const handleClick = () => {
    alert("Please Log In to continue browse");
  };

  const userAuth = auth.decoded.role;
  const user = "633c251c104509110d12e79d";

  return (
    <div className="m-6 p-6 flex flex-col bg-primaryWhite rounded-sm shadow-2xl shadow-gray h-[350px] w-10/12 font-BookFont max-w-[250px]">
      <h3 className="mb-2 text-xl font-bold text-center uppercase">{title}</h3>
      <>{authors?.map((author) => {
        return(
          <div>
            <p>Written by:</p>
            <p>{author.firstName} {author.lastName}</p>


          </div>
        )
      })}</>
      <p className="p-3 italic">Category:<li className="marker:text-primaryOrange">{category}</li></p>
      {userAuth === user ? (
        <Link to={`/book/${isbn}`} className="px-3 pt-4">
          <button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-primaryWhite bg-primaryBlue transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-primaryOrange duration-300">
            Read more
            <FiArrowRight aria-hidden="true" />
          </button>
        </Link>
      ) : (
        <div className="px-3 pt-4">
          <button
            onClick={handleClick}
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-primaryWhite bg-primaryBlue transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-primaryOrange duration-300"
          >
            Read more
            <FiArrowRight aria-hidden="true" />
          </button>
        </div>
      )}
      <div className="flex">
        <p className="pt-3 px-2 text-lg font-bold text-primaryBlue">
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

export default BookCard;
