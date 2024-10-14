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
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import HeartIcon from "../pages/HeartIcon";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useShowPurchasedCoursesQuery } from "../redux/api/usersApiSlice";

const Modal = ({ course, difference, boughtHandler }) => {
  const { userInfo } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [show, setShow] = useState("absolute top-[7rem]");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useShowPurchasedCoursesQuery(
    userInfo?._id
  );

  const controlModal = () => {
    if (difference) {
      if (window.scrollY > 160 && window.scrollY < difference - 970) {
        setShow("fixed top-[2rem]");
      } else if (window.scrollY > difference - 970) {
        setShow("absolute bottom-[45rem]");
      } else {
        setShow("absolute top-[7rem]");
      }
    }
  };

  useEffect(() => {
    if (userInfo?._id) {
      refetch();
    }
    window.addEventListener("scroll", controlModal);
    return () => {
      window.removeEventListener("scroll", controlModal);
    };
  }, [difference, userInfo, refetch]);

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
          {isLoading ? (
            <div className="text-white text-xl text-center my-5">
              Loading...
            </div>
          ) : data?.some((item) => item._id === course._id) ? (
            <div>
              <Button
                color="green"
                width="true"
                onClick={() => navigate(`/course/view/${course._id}`)}
              >
                Go to course
              </Button>
            </div>
          ) : (
            <div>
              {console.log(
                cartItems?.some((cartItem) => cartItem._id === course._id)
              )}
              {cartItems?.some((cartItem) => cartItem._id === course._id) ? (
                <Button
                  color="green"
                  width="true"
                  onClick={() => {
                    userInfo === null
                      ? toast.error(
                          "Kindly login from student account to buy the course!"
                        )
                      : userInfo.role !== "student"
                      ? toast.error(
                          "Kindly login from student account to buy the course!"
                        )
                      : navigate("/cart");
                  }}
                >
                  Go to Cart
                </Button>
              ) : (
                <Button
                  color="green"
                  width="true"
                  onClick={() => {
                    userInfo === null
                      ? toast.error(
                          "Kindly login from student account to buy the course!"
                        )
                      : userInfo.role !== "student"
                      ? toast.error(
                          "Kindly login from student account to buy the course!"
                        )
                      : dispatch(addToCart(course));
                  }}
                >
                  Add to Cart
                </Button>
              )}
              <Button
                color="black"
                width="true"
                onClick={() => {
                  userInfo === null
                    ? toast.error(
                        "Kindly login from student account to buy the course!"
                      )
                    : userInfo.role !== "student"
                    ? toast.error(
                        "Kindly login from student account to buy the course!"
                      )
                    : boughtHandler(userInfo._id);
                }}
              >
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
          {isLoading ? (
            <div className="text-white text-xl text-center my-5">
              Loading...
            </div>
          ) : data?.some((item) => item._id === course._id) ? (
            <div>
              <Button
                color="green"
                width="true"
                onClick={() => navigate(`/course/view/${course._id}`)}
              >
                Go to course
              </Button>
            </div>
          ) : (
            <div>
              {cartItems?.some((cartItem) => cartItem._id === course._id) ? (
                <Button
                  color="green"
                  width="true"
                  onClick={() => {
                    userInfo === null
                      ? toast.error(
                          "Kindly login from student account to buy the course!"
                        )
                      : userInfo.role !== "student"
                      ? toast.error(
                          "Kindly login from student account to buy the course!"
                        )
                      : navigate("/cart");
                  }}
                >
                  Go to Cart
                </Button>
              ) : (
                <Button
                  color="green"
                  width="true"
                  onClick={() => {
                    userInfo === null
                      ? toast.error(
                          "Kindly login from student account to buy the course!"
                        )
                      : userInfo.role !== "student"
                      ? toast.error(
                          "Kindly login from student account to buy the course!"
                        )
                      : dispatch(addToCart(course));
                  }}
                >
                  Add to Cart
                </Button>
              )}
              <Button
                color="black"
                width="true"
                onClick={() => {
                  userInfo === null
                    ? toast.error(
                        "Kindly login from student account to buy the course!"
                      )
                    : userInfo.role !== "student"
                    ? toast.error(
                        "Kindly login from student account to buy the course!"
                      )
                    : boughtHandler(userInfo._id);
                }}
              >
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
