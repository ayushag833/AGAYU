import React from "react";
import { useFetchAllCoursesQuery } from "../../redux/api/coursesApiSlice";
import CourseCard from "../Course/CourseCard";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const Courses = () => {
  const {
    data: allCourses,
    isLoading: allCoursesLoading,
    isError: allCoursesError,
  } = useFetchAllCoursesQuery();
  return (
    <div>
      <div className="m-10 text-white">
        <h1 className="mb-5 text-3xl font-bold">All Courses</h1>
        <div className="grid grid-cols-4 gap-10 w-full">
          {allCoursesLoading ? (
            <Loader />
          ) : allCoursesError ? (
            <Message variant="error">Error Occurred</Message>
          ) : (
            allCourses.map((course) => (
              <CourseCard key={course._id} course={course} condition={true} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
