import { Link } from "react-router-dom";
import { Book } from "types";

import { IoCloseCircle, IoCheckmarkCircle } from "react-icons/io5";

const AdminBooksDisplay = ({ title, isbn, _id, isAvailable }: Book) => {
  return (
    <>
      <div className="bg-primaryZinc min-w-full min-h-full justify-between rounded-sm shadow-2xl shadow-gray flex flex-col p-3">
        <h3 className="pt-3 px-2 text-lg font-bold text-primaryBlue">ISBN</h3>
        <p className="px-2">{isbn}</p>
        <h3 className="pt-3 px-2 text-lg font-bold text-primaryBlue">Title</h3>
        <p className="px-2 uppercase">{title}</p>
        <div className="flex">
          <h3 className="pt-3 px-2 text-lg font-bold text-primaryBlue">
            Available
          </h3>
          <p className="p-3">
            {isAvailable ? (
              <IoCheckmarkCircle className="text-green-700" size="25px" />
            ) : (
              <IoCloseCircle className="text-red-900" size="25px" />
            )}
          </p>
        </div>
        <Link
          to={`/admin/dashboard/book/${_id}`}
          className="flex justify-end pt-6"
        >
          <button className="bg-primaryOrange text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-2 ease-linear transition-all duration-250">
            Details
          </button>
        </Link>
      </div>
    </>
  );
};

export default AdminBooksDisplay;
