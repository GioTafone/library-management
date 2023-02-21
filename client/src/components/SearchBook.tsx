import { SearchBookProps } from "types";

const SearchBook = ({
  handleSubmit,
  handleChange,
  title,
  publishedYear,
  authors,
  isAvailable
}: SearchBookProps) => {
  return (
    <div className="col-span-2">
      <form className="m-10 flex flex-col max-w-sm" onSubmit={handleSubmit}>
        <h4 className="mx-10 my-2 text-xl text-primaryWhite">Search By:</h4>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={title}
          className="mx-10 my-2"
          placeholder="Title"
        />
        <input
          type="text"
          name="publishedYear"
          onChange={handleChange}
          value={publishedYear}
          className="mx-10 my-2"
          placeholder="Year"
        />
        <select
          name="isAvailable"
          id="isAvailable"
          onChange={handleChange}
          className="mx-10 my-2"
        >
          <option hidden disabled selected>
            -- Availability --
          </option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
        <select
          name="authorId"
          id="authors"
          onChange={handleChange}
          className="mx-10 my-2"
        >
          <option hidden disabled selected>
            -- Choose an Author --
          </option>
          <option hidden disabled selected>
            -- Choose a Category --
          </option>
          <option value="Adventure">Adventure</option>
          <option value="Bio">Bio</option>
          <option value="Fiction">Fiction</option>
          <option value="History">History</option>
          <option value="Novel">Novel</option>
          <option value="Science">Science</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>
        <select
          name="authorId"
          id="authors"
          onChange={handleChange}
          className="mx-10 my-2"
        >
          <option hidden disabled selected>
            -- Choose an Author --
          </option>

          {authors.map((author) => (
            <option className="uppercase"key={author._id} value={author._id}>
              {author.firstName} {author.lastName}
            </option>
          ))}
        </select>
        <div className="mx-10 my-2 flex justify-end">
          <button className="inline-flex items-center bg-primaryOrange text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-250">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBook;
