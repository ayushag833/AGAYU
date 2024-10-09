import React from "react";
import {
  useGetBudgetCoursesQuery,
  useGetLatestCoursesQuery,
  useGetPopularCoursesQuery,
} from "../../redux/api/coursesApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Carousel from "../../components/Carousel";
import ImageSlider from "../../components/ImageSlider";
import teacherImg from "../../assets/Teacher.jpg";
import Button from "../../components/Button";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const {
    data: latestCourses,
    isLoading: latestCoursesLoading,
    isError: latestCoursesError,
    error,
  } = useGetLatestCoursesQuery();
  const {
    data: budgetCourses,
    isLoading: budgetCoursesLoading,
    isError: budgetCoursesError,
  } = useGetBudgetCoursesQuery();
  const {
    data: popularCourses,
    isLoading: popularCoursesLoading,
    isError: popularCoursesError,
  } = useGetPopularCoursesQuery();

  return (
    <div className="text-white">
      <Carousel />
      <div className="m-10">
        <h1 className="mb-5 text-3xl font-bold">Latest Courses</h1>
        <div>
          {latestCoursesLoading ? (
            <Loader />
          ) : latestCoursesError ? (
            <Message variant="error">{error?.data}</Message>
          ) : (
            <>{<ImageSlider courses={latestCourses} />}</>
          )}
        </div>
      </div>
      <div className="m-10">
        <h1 className="mb-5 text-3xl font-bold">Popular Courses</h1>
        <div>
          {popularCoursesLoading ? (
            <Loader />
          ) : popularCoursesError ? (
            <Message variant="error">{error?.data}</Message>
          ) : (
            <>{<ImageSlider courses={popularCourses} />}</>
          )}
        </div>
      </div>
      <div className="m-10">
        <h1 className="mb-5 text-3xl font-bold">Pocket Friendly Courses</h1>
        <div>
          {budgetCoursesLoading ? (
            <Loader />
          ) : budgetCoursesError ? (
            <Message variant="error">{error?.data}</Message>
          ) : (
            <>{<ImageSlider courses={budgetCourses} />}</>
          )}
        </div>
      </div>
      <div className="flex p-10 gap-10">
        <div className="mt-[5rem]">
          <h1 className="text-[2.2rem] mb-10 text-green-500 capitalize">
            Share your knowledge, Shape the future.
          </h1>
          <h2 className="text-2xl mb-10 ">
            Teaching empowers you to inspire and uplift others. By sharing your
            knowledge, you can make a lasting impact and help someone unlock
            their potential.
          </h2>
          <Button
            color="green"
            onClick={() => {
              userInfo
                ? toast.error("You need to log out first!")
                : navigate("/login?role=teacher");
            }}
            customCSS="text-[1.3rem] flex gap-2 p-10"
          >
            Teach on Agayu <FaArrowRight />
          </Button>
        </div>
        <img src={teacherImg} className="h-[30rem] border-2 rounded-xl" />
      </div>
    </div>
  );
};

export default Home;
