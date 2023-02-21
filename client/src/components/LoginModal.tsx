import { useState } from "react";

import { LoginModalProps } from "types";

const LoginModal = ({ buttonText, login, contentLogin }: LoginModalProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal((prevState) => !prevState);
  };
  return (
    <div>
      <button
        className="bg-primaryOrange text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-250"
        type="button"
        onClick={handleModal}
      >
        {buttonText}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-sm shadow-lg relative flex flex-col w-full bg-primaryBlue outline-none focus:outline-none min-w-[260px]">
                <div className="flex items-start justify-between p-5 border-slate-200">
                  <h3 className="text-xl font-semibold">{login}</h3>
                </div>
                <div className="relative p-6 flex-auto">{contentLogin}</div>
                <div className="flex items-center justify-end p-6 border-slate-200">
                  <button
                    className="bg-primaryOrange text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-2 ease-linear transition-all duration-250"
                    type="button"
                    onClick={handleModal}
                  >
                    Close
                  </button>
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

export default LoginModal;
