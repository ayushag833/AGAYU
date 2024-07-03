import React from "react";
import StudentMenu from "./StudentMenu";

const StudentCourses = () => {
  return (
    <div className="flex text-white justify-around">
      <div className="flex flex-col gap-[1rem] justify-center items-center">
        <div>My Courses</div>
      </div>
      <StudentMenu />
    </div>
  );
};

export default StudentCourses;
