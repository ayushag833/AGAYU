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
        <div className="grid grid-cols-4 gap-10">
          {latestCoursesLoading ? (
            <Loader />
          ) : latestCoursesError ? (
            <Message variant="error">{error?.data}</Message>
          ) : (
            latestCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
      <div className="m-10">
        <h1 className="mb-5 text-3xl font-bold">Popular Courses</h1>
        <div className="grid grid-cols-4 gap-10">
          {popularCoursesLoading ? (
            <Loader />
          ) : popularCoursesError ? (
            <Message variant="error">Error Occurred</Message>
          ) : (
            popularCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
      <div className="m-10">
        <h1 className="mb-5 text-3xl font-bold">Pocket Friendly Courses</h1>
        <div className="grid grid-cols-4 gap-10">
          {budgetCoursesLoading ? (
            <Loader />
          ) : budgetCoursesError ? (
            <Message variant="error">Error Occurred</Message>
          ) : (
            budgetCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
