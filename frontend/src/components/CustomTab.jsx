import React from "react";

const CustomTab = ({ variant, children, customCSS }) => {
  const getVariant = () => {
    switch (variant) {
      case "inside":
        return "bg-green-100 text-green-800";
      case "outside":
        return "bg-green-600 text-white";
    }
  };
  return (
    <span>
      <span
        className={`${getVariant()} ${customCSS} text-sm text-center font-medium rounded-full mr-2 px-2.5 py-0.5`}
      >
        {children}
      </span>
    </span>
  );
};

export default CustomTab;
