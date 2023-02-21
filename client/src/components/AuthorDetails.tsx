import { Author } from "types";

const BookDetails = ({ firstName, lastName, books }: Author) => {
  return (
    <div className="m-6 p-6 max-w-sm bg-primaryZinc rounded-sm border border-gray-200 shadow-md">
      <a href="/">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-primaryBlue uppercase">
          First Name
        </h3>
        <p>{firstName} </p>
        <h3 className="mb-2 text-xl font-bold tracking-tight text-primaryBlue uppercase">
          Last Name
        </h3>
        <p>{lastName} </p>
      </a>
      <div>
        <h3 className="mb-2 text-xl font-bold tracking-tight text-primaryBlue uppercase">
          Books
        </h3>
        <div>{books}</div>
      </div>
    </div>
  );
};
export default BookDetails;
