import React from "react";
import TeacherMenu from "./TeacherMenu";
import { useShowPurchasedCoursesQuery } from "../../redux/api/usersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useSelector } from "react-redux";

// const userDetails = useSelector((state) => state.user);
// const id = userDetails.userInfo._id;
// const { data, isLoading, isError, error } = useShowPurchasedCoursesQuery(id);

const TeacherCreateCourse = () => {
  return (
    <div className="flex">
      <TeacherMenu />
      <div className="flex flex-col items-center mt-[2rem] h-[30rem] w-[70rem]  gap-[1rem] text-white">
        <div className="text-xl">Create Course</div>
      </div>
    </div>
  );
};

export default TeacherCreateCourse;
