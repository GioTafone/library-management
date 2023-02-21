import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoCloseCircle } from "react-icons/io5";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { createBookThunk } from "redux/asyncThunks/bookThunks";
import { fetchAuthorThunk } from "redux/asyncThunks/authorThunks";
import { bookSchema, BookFormData } from "validation";
import { Book } from "types";

const AddBookModal = () => {
  const dispatch = useAppDispatch();
  const authors = useAppSelector((state) => state.authors.items);

  useEffect(() => {
    dispatch(fetchAuthorThunk());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormData>({
    mode: "all",
    resolver: zodResolver(bookSchema),
  });

  const handleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const onSubmit = handleSubmit((data) => {
    dispatch(createBookThunk(data.body as Book));
    reset()
    handleModal()
  });

  const errorsValues = Object.entries(errors);
  return (
    <div className="px-10">
      <button
        className="bg-primaryOrange text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-250"
        type="button"
        onClick={handleModal}
      >
        Add Book
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="rounded-sm shadow-lg relative flex flex-col w-full bg-primaryBlue outline-none focus:outline-none min-w-[260px]">
                <div className="col-span-2">
                  <form
                    className="m-10 flex flex-col max-w-sm"
                    onSubmit={onSubmit}
                  >
                    {errorsValues.length > 0 ? (
                      errorsValues.length && (
                        <fieldset className="flex justify-center mb-4">
                          <legend className="text-primaryZinc">
                            Please make sure to fill all the required fields
                          </legend>
                        </fieldset>
                      )
                    ) : (
                      <div></div>
                    )}
                    <div className="flex justify-between">
                      <h4 className="mx-10 my-2 text-xl text-primaryWhite">
                        Add Book to Collection
                      </h4>
                      <p onClick={handleModal}>
                        <IoCloseCircle
                          size="25px"
                          className="text-primaryOrange"
                        />
                      </p>
                    </div>
                    <input
                      type="text"
                      className="mx-10 my-2"
                      placeholder="ISBN - Required"
                      {...register("body.isbn")}
                    />
                    <input
                      type="text"
                      className="mx-10 my-2"
                      placeholder="Title - Required"
                      {...register("body.title")}
                    />
                    <select
                      className="mx-10 my-2"
                      {...register("body.authors")}
                    >
                      <option hidden disabled selected>
                        -- Choose an author --
                      </option>

                      {authors.map((author) => {
                        console.log(author._id);
                        return (
                          <option className="uppercase" key={author._id} value={author._id}>
                            {author.firstName}{" "}
                            {author.lastName}
                          </option>
                        );
                      })}
                    </select>
                    <input
                      type="text"
                      className="mx-10 my-2"
                      placeholder="Publisher"
                      {...register("body.publisher")}
                    />
                    <textarea
                      className="mx-10 my-2"
                      placeholder="Description"
                      {...register("body.description")}
                    />
                    <select
                      className="mx-10 my-2"
                      {...register("body.category")}
                    >
                      {" "}
                      <option hidden disabled selected>
                        - Category Required -
                      </option>
                      <option value="Adventure">Adventure</option>
                      <option value="Bio">Bio</option>
                      <option value="Fiction">Fiction</option>
                      <option value="History">History</option>
                      <option value="Novel">Novel</option>
                      <option value="Science">Science</option>
                      <option value="Sci-Fi">Sci-Fi</option>
                    </select>
                    <input
                      type="text"
                      className="mx-10 my-2"
                      placeholder="Published Year - Required"
                      {...register("body.publishedYear")}
                    />
                    <div className="mx-10 my-2 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center bg-primaryOrange text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-250 mr-1"
                        onClick={onSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default AddBookModal;
