import React from "react";
import TeacherMenu from "./TeacherMenu";

const TeacherRevenue = () => {
  return (
    <div className="flex">
      <TeacherMenu />
      <div className="flex flex-col items-center mt-[2rem] h-[30rem] w-[70rem]  gap-[1rem] text-white">
        <div className="text-xl">My Revenue</div>
      </div>
    </div>
  );
};

export default TeacherRevenue;
