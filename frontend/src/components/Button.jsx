import React from "react";

const Button = ({ color, children, onClick, width }) => {
  const getColor = () => {
    switch (color) {
      case "green":
        return "bg-green-500 hover:bg-green-600 active:bg-green-700";
      case "black":
        return "border-2 bg-black-500 hover:bg-black-600 active:bg-black-700 hover:opacity-80";
      default:
        return "bg-blue-500 hover:bg-blue-600 active:bg-blue-700";
    }
  };
  return (
    <div className="flex w-full justify-center items-center">
      <button
        className={`${getColor()} ${
          width ? "w-full" : ""
        } mt-5 mb-5 block px-3 py-2 text-white border-slate-300 rounded-md font-medium text-sm shadow-sm`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
