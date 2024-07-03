import React from "react";
import StudentMenu from "./StudentMenu";

const StudentDelete = () => {
  return (
    <div className="flex text-white justify-around">
      <div className="flex flex-col gap-[1rem] justify-center items-center">
        <div>Are you sure you want to delete your account?</div>
        <button
          className="bg-red-200 h-[5rem] w-[10rem] p-[0.5rem] font-bold text-lg rounded-lg text-red-800 border-red-800 border-4"
          onClick={() => alert("All of your data will be permanently deleted")}
        >
          Delete
        </button>
      </div>
      <StudentMenu />
    </div>
  );
};

export default StudentDelete;
