import React from "react";
import {
  useGetBudgetCoursesQuery,
  useGetLatestCoursesQuery,
  useGetPopularCoursesQuery,
} from "../../redux/api/coursesApiSlice";
import CourseCard from "../Course/CourseCard";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Carousel from "../../components/Carousel";
import ImageSlider from "../../components/ImageSlider";

const Home = () => {
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
    </div>
  );
};

export default Home;
