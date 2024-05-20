import React from "react";
import { RxCross2 } from "react-icons/rx";

const CustomModal = ({ setDropdown }) => {
  const currentLang = "English"; // Create a slice and store it in and also store in local storage
  const languages = [
    "English",
    "Hindi",
    "Japanese",
    "Tamil",
    "Telugu",
    "Haryanvi",
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="fixed inset-0 bg-opacity-80 backdrop-blur-sm z-10"></div>
      <div className="bg-slate-50 text-black text-xl fixed z-20 duration-150 ease-in-out rounded-lg p-2">
        <div className="flex justify-center pt-5 font-bold">
          <div>Select your Language</div>
        </div>
        <RxCross2
          className="absolute top-5 right-5 text-3xl font-extrabold duration-150 ease-in-out hover:opacity-80 cursor-pointer"
          onClick={() => setDropdown(false)}
        />
        <div className="grid grid-cols-3 gap-5 pt-0 pb-5 p-10 mt-5">
          {languages.map((lang, ind) => (
            <span
              key={ind}
              className={`${
                currentLang === lang
                  ? "border-2 border-slate-700 rounded-full"
                  : ""
              } text-lg cursor-pointer duration-150 p-1 ease-in-out hover:opacity-80 text-center`}
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
