import { Link } from "react-router-dom";
import { Author } from "types";

const AdminBooksDisplay = ({ firstName, lastName, _id }: Author) => {
  return (
    <div className="bg-primaryZinc min-w-full min-h-full justify-between rounded-sm shadow-2xl shadow-gray flex flex-col p-3">
      <h3 className="pt-3 px-2 text-lg font-bold text-primaryBlue uppercase">
        First Name
      </h3>
      <p className="p-3">{firstName}</p>
      <h3 className="pt-3 px-2 text-lg font-bold text-primaryBlue uppercase">
        Last Name
      </h3>
      <p className="p-3">{lastName}</p>
      <Link to={`/admin/dashboard/author/${_id}`}>
        <button className="bg-primaryOrange text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-2 ease-linear transition-all duration-250">
          Details
        </button>
      </Link>
    </div>
  );
};

export default AdminBooksDisplay;
