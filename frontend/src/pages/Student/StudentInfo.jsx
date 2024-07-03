import React from "react";
import StudentMenu from "./StudentMenu";

const StudentInfo = () => {
  return (
    <div className="flex text-white justify-around">
      <div className="flex flex-col gap-[1rem] justify-center items-center">
        <div>Additional Information</div>
      </div>
      <StudentMenu />
    </div>
  );
};

export default StudentInfo;
