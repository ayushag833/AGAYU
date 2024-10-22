import React from "react";
import StudentMenu from "./StudentMenu";
import { useShowPurchasedCoursesQuery } from "../../redux/api/usersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import CourseCard from "../Course/CourseCard";
import { useSelector } from "react-redux";

const StudentCourses = () => {
  const userDetails = useSelector((state) => state.user);
  const id = userDetails?.userInfo?._id;
  const { data, isLoading, isError, error } = useShowPurchasedCoursesQuery(id);

  return (
    <div className="flex">
      <StudentMenu />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div>
          <Message variant="error">{error?.data?.Error}</Message>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-[2rem] h-fit w-[70rem]  gap-[1rem] text-white">
          <div className="text-xl">My Courses</div>
          <div className="grid grid-cols-3 w-full ml-[5rem]">
            {data &&
              Array.isArray(data) &&
              data?.map((course) => (
                <div className="p-5" key={course._id}>
                  <CourseCard course={course} condition={true} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
