import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoCloseCircle } from "react-icons/io5";

import { useAppDispatch } from "redux/hooks";
import { editAuthorThunk } from "redux/asyncThunks/authorThunks";
import { authorSchema, AuthorFormData } from "validation";
import { Author } from "types";

const EditAuthorModal = ({ _id, firstName, lastName }: Author) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorFormData>({
    mode: "all",
    resolver: zodResolver(authorSchema),
    defaultValues: {
      body: {
        _id: _id,
        firstName: firstName,
        lastName: lastName,
      },
    },
  });

  const handleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const onSubmit = handleSubmit((data) => {
    dispatch(editAuthorThunk(data.body));
    handleModal();
  });

  const errorsValues = Object.entries(errors);

  return (
    <div className="pr-2 mt-3">
      <button
        className="bg-primaryOrange text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-2 ease-linear transition-all duration-250 w-full"
        type="button"
        onClick={handleModal}
      >
        Update Author
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
                        Update Author
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
                      placeholder="First Name - Required"
                      {...register("body.firstName")}
                    />
                    <input
                      type="text"
                      className="mx-10 my-2"
                      placeholder="Last Name - Required"
                      {...register("body.lastName")}
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

export default EditAuthorModal;
