import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import HeartIcon from "../pages/HeartIcon";

const Modal = ({ course, boughtHandler, showButton, difference }) => {
  const [show, setShow] = useState("absolute top-[7rem]");
  const dispatch = useDispatch();

  const controlModal = () => {
    if (difference) {
      if (window.scrollY > 160 && window.scrollY < difference - 660) {
        setShow("fixed top-[2rem]");
      } else if (window.scrollY > difference - 660) {
        setShow("absolute bottom-[45rem]");
      } else {
        setShow("absolute top-[7rem]");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlModal);
    return () => {
      window.removeEventListener("scroll", controlModal);
    };
  }, [window.scrollY]);

  return (
    <div className="relative">
      {show === "fixed" ? (
        <div
          className={`${show} right-[5rem] bg-slate-900 w-[25rem] shadow-slate-500 p-5 shadow-[0px_0px_3px_3px_rgba(0,0,0,0.5)] ease-in-out`}
        >
          <img
            src={course.image}
            alt="course-image"
            className="w-[25rem] rounded-md"
          />
          <div className="relative bottom-[13rem] left-[1rem]">
            <HeartIcon course={course} />
          </div>
          <h1 className="text-3xl font-bold mt-5 text-center">
            &#8377;{course.price}
          </h1>
          {showButton && (
            <div>
              <Button
                color="green"
                width="true"
                onClick={() => dispatch(addToCart(course))}
              >
                Add to Cart
              </Button>
              <Button color="black" width="true" onClick={boughtHandler}>
                Buy Now
              </Button>
            </div>
          )}
          <h2 className="text-3xl font-bold mt-5 mb-5">This Course Includes</h2>
          <h2 className="grid gap-2">
            {course.includes.split("\n").map((include, index) => (
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
      ) : (
        <div
          className={`${show} right-[5rem] bg-slate-900 w-[25rem] shadow-slate-500 p-5 shadow-[0px_0px_3px_3px_rgba(0,0,0,0.5)] ease-in-out`}
        >
          <img
            src={course.image}
            alt="course-image"
            className="w-[25rem] rounded-md"
          />
          <div className="relative bottom-[13rem] left-[1rem]">
            <HeartIcon course={course} />
          </div>{" "}
          <h1 className="text-3xl font-bold mt-5 text-center">
            &#8377;{course.price}
          </h1>
          {showButton && (
            <div>
              <Button
                color="green"
                width="true"
                onClick={() => dispatch(addToCart(course))}
              >
                Add to Cart
              </Button>
              <Button color="black" width="true" onClick={boughtHandler}>
                Buy Now
              </Button>
            </div>
          )}
          <h2 className="text-3xl font-bold mt-5 mb-5">This Course Includes</h2>
          <h2 className="grid gap-2">
            {course.includes.split("\n").map((include, index) => (
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
      )}
    </div>
  );
};

export default Modal;
