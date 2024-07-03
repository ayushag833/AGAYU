import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const StudentMenu = () => {
  const userDetails = useSelector((state) => state.user);
  return (
    <div>
      <div className="text-white mt-[5rem] flex flex-col border rounded-lg">
        <NavLink
          to={`/profile/${userDetails?.userInfo?.role}/update`}
          className="border-b p-5 text-center hover:underline"
          style={({ isActive }) => ({
            color: isActive ? "greenyellow" : "white",
          })}
        >
          Update
        </NavLink>
        <NavLink
          to={`/profile/${userDetails?.userInfo?.role}/delete`}
          className="border-b p-5 text-center hover:underline"
          style={({ isActive }) => ({
            color: isActive ? "greenyellow" : "white",
          })}
        >
          Delete
        </NavLink>
        <NavLink
          to={`/profile/${userDetails?.userInfo?.role}/courses`}
          className="border-b p-5 text-center hover:underline"
          style={({ isActive }) => ({
            color: isActive ? "greenyellow" : "white",
          })}
        >
          My Courses
        </NavLink>
        <NavLink
          to={`/profile/${userDetails?.userInfo?.role}/information`}
          className="p-5 text-center hover:underline"
          style={({ isActive }) => ({
            color: isActive ? "greenyellow" : "white",
          })}
        >
          Additional Information
        </NavLink>
      </div>
    </div>
  );
};

export default StudentMenu;
