import React from "react";
import TeacherMenu from "./TeacherMenu";
import { useShowPurchasedCoursesQuery } from "../../redux/api/usersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import CourseCard from "../Course/CourseCard";
import { useSelector } from "react-redux";

const TeacherCourses = () => {
  const userDetails = useSelector((state) => state.user);
  const id = userDetails.userInfo._id;
  const { data, isLoading, isError, error } = useShowPurchasedCoursesQuery(id);

  return (
    <div className="flex">
      <TeacherMenu />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>
          <Message variant="error">{error?.error}</Message>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-[2rem] h-[30rem] w-[70rem]  gap-[1rem] text-white">
          <div className="text-xl">My Courses</div>
          {/* {data?.map((course) => (
            <div className="p-5" key={course._id}>
              <CourseCard course={course} />
            </div>
          ))} */}
        </div>
      )}
    </div>
  );
};

export default TeacherCourses;
