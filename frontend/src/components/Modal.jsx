import React from "react";
import Button from "../components/Button";
import {
  FaCircle,
  FaDownload,
  FaFileCode,
  FaMobileAlt,
  FaTrophy,
} from "react-icons/fa";
import { RiArticleFill } from "react-icons/ri";
import { MdOndemandVideo } from "react-icons/md";

const Modal = ({ image, price, includes, boughtHandler, showButton }) => {
  return (
    <div
      className={`absolute right-[5rem] top-[10rem] bg-slate-900 w-[25rem] shadow-slate-500 p-5 shadow-[0px_0px_3px_3px_rgba(0,0,0,0.5)]`}
    >
      <img src={image} alt="course-image" className="w-[25rem] rounded-md" />
      <h1 className="text-3xl font-bold mt-5 text-center">&#8377;{price}</h1>
      {showButton && (
        <div>
          <Button color="green" width="true">
            Add to Cart
          </Button>
          <Button color="black" width="true" onClick={boughtHandler}>
            Buy Now
          </Button>
        </div>
      )}
      <h2 className="text-3xl font-bold mt-10 mb-5">This Course Includes </h2>
      <h2 className="grid gap-2">
        {includes.split(".").map((include, index) => (
          <div key={index} className="flex gap-[0.3rem] items-center">
            <h2 className=" text-[1rem] mr-[0.2rem]">
              <div>
                {index === 0 && <MdOndemandVideo />}
                {index === 1 && <FaDownload />}
                {index === 2 && <FaFileCode />}
                {index === 3 && <FaMobileAlt />}
                {index === 4 && <RiArticleFill />}
                {index === 5 && <FaTrophy />}
                {index > 5 && <FaCircle />}
              </div>
            </h2>
            <h2>{include}.</h2>
          </div>
        ))}
      </h2>
    </div>
  );
};

export default Modal;
