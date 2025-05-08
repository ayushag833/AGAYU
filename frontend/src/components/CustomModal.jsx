import React from "react";
import { RxCross2 } from "react-icons/rx";
import i18n from "../config/i18n"

const CustomModal = ({ setDropdown }) => {
  const currentLang = i18n.language

  const languages = [
    { label: "English", code: "en" },
    { label: "Hindi", code: "hi" },
    { label: "Haryanvi", code: "ha" },
    { label: "Bhojpuri", code: "bi" },
    { label: "Punjabi", code: "pb" },
    { label: "Japanese", code: "ja" },
    { label: "French", code: "fr" },
    { label: "Russian", code: "ru" },
    { label: "Spanish", code: "sp" },
  ];

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    setDropdown(false);
  };

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
          {languages.map(({ label, code }, ind) => (
            <span
              key={ind}
              onClick={() => handleLanguageChange(code)}
              className={`${
                currentLang === label
                  ? "border-2 border-slate-700 rounded-full"
                  : ""
              } text-lg cursor-pointer duration-150 p-1 ease-in-out hover:opacity-80 text-center`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
