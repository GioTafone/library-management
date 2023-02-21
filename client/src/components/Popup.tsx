import { PopupProps } from "types";

const Popup = ({ handlePopup, text, content }: PopupProps) => {
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative w-auto my-6 mx-auto max-w-3xl bg-primaryOrange p-1 rounded-sm">
          <div className="border-0 rounded-sm shadow-lg relative flex flex-col w-full bg-primaryZinc outline-none focus:outline-none min-w-[260px] p-4 text-primaryBlue">
            <div className="flex items-start justify-between p-5 border-slate-200">
              <h3 className="text-xl font-bold uppercase">{text}</h3>
            </div>
            <h4 className="relative p-6 flex-auto font-semibold text-lg">{content}</h4>
            <div className="flex items-center justify-end p-6 border-slate-200">
              <button
                className="bg-primaryOrange text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-2 ease-linear transition-all duration-250"
                type="button"
                onClick={handlePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default Popup;
