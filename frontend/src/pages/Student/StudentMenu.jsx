import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { BiBookBookmark } from "react-icons/bi";
import { IoLogOutOutline } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { userLogout } from "../../redux/slices/userSlice";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";

const StudentMenu = () => {
  const userDetails = useSelector((state) => state.user);
  const role = userDetails?.userInfo?.role;
  const id = userDetails?.userInfo?._id;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [LogoutMutation] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await LogoutMutation().unwrap();
      dispatch(userLogout());
      navigate("/");
      toast.success("User logged out successfully!");
    } catch (error) {
      console.error(error.error);
      toast.error(error.error);
    }
  };

  return (
    <div className="h-[50rem] w-[20rem]">
      <div className="text-white flex flex-col bg-blue-900 h-full ml-10 mt-10">
        <NavLink
          to={`/profile/${role}/update/${id}`}
          className={({ isActive }) =>
            isActive
              ? "p-2 m-5 text-center bg-green-500 hover:underline rounded-full"
              : "p-2 m-5 text-center hover:underline"
          }
        >
          <RiAccountCircleFill className="text-xl mr-1 mb-1 inline-block" />
          Profile
        </NavLink>
        <NavLink
          to={`/profile/${role}/delete/${id}`}
          className={({ isActive }) =>
            isActive
              ? "p-2 m-5 text-center bg-green-500 hover:underline rounded-full"
              : "p-2 m-5 text-center hover:underline"
          }
        >
          <MdDelete className="text-xl mr-1 mb-1 inline-block" />
          Delete Account
        </NavLink>
        <NavLink
          to={`/profile/${role}/password/${id}`}
          className={({ isActive }) =>
            isActive
              ? "p-2 m-5 text-center bg-green-500 hover:underline rounded-full"
              : "p-2 m-5 text-center hover:underline"
          }
        >
          <RiLockPasswordFill className="text-xl mr-1 mb-1 inline-block" />
          Change password
        </NavLink>
        <NavLink
          to={`/profile/${role}/courses/${id}`}
          className={({ isActive }) =>
            isActive
              ? "p-2 m-5 text-center bg-green-500 hover:underline rounded-full"
              : "p-2 m-5 text-center hover:underline"
          }
        >
          <BiBookBookmark className="text-xl mr-1 mb-1 inline-block" />
          My Courses
        </NavLink>
        <div
          className="p-2 m-5 text-center  hover:underline rounded-full cursor-pointer"
          onClick={logoutHandler}
        >
          <IoLogOutOutline className="text-xl mr-1 mb-1 inline-block" />
          Log Out
        </div>
      </div>
    </div>
  );
};

export default StudentMenu;
