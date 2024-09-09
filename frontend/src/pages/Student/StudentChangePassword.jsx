import React, { useState } from "react";
import StudentMenu from "./StudentMenu";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../components/Button";
import { useUpdatePasswordMutation } from "../../redux/api/usersApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const StudentChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const userDetails = useSelector((state) => state.user);
  const id = userDetails.userInfo._id;

  const [updatePassword] = useUpdatePasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (newPassword != confirmPassword) {
      toast.error("Password do not match!");
      return;
    }
    try {
      const res = await updatePassword(id, oldPassword, newPassword).unwrap();
      toast.success("Password Changed successfully");
    } catch (error) {
      console.log(error, error.message);
      toast.error("Error in changing password");
    }
  };

  return (
    <div className="flex">
      <StudentMenu />
      <div className="flex flex-col items-center justify-center h-[30rem] w-[70rem]  gap-[1rem] text-white">
        <div className="text-xl ">Change Password</div>
        <form onSubmit={submitHandler}>
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-slate-200 relative"
          >
            Old Password
            {oldPasswordVisible ? (
              <FaEyeSlash
                className="absolute left-[28rem] top-[2rem] text-black text-xl cursor-pointer"
                onClick={() => setOldPasswordVisible(false)}
              />
            ) : (
              <FaEye
                className="absolute left-[28rem] top-[2rem] text-black text-xl cursor-pointer "
                onClick={() => setOldPasswordVisible(true)}
              />
            )}
            <input
              type={oldPasswordVisible ? "text" : "password"}
              name="oldPassword"
              placeholder="Enter Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-1 mb-5 block w-[30rem] px-3 py-2 text-black border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </label>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-slate-200 relative"
          >
            New Password
            {newPasswordVisible ? (
              <FaEyeSlash
                className="absolute left-[28rem] top-[2rem] text-black text-xl cursor-pointer"
                onClick={() => setNewPasswordVisible(false)}
              />
            ) : (
              <FaEye
                className="absolute left-[28rem] top-[2rem] text-black text-xl cursor-pointer "
                onClick={() => setNewPasswordVisible(true)}
              />
            )}
            <input
              type={newPasswordVisible ? "text" : "password"}
              name="newPassword"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 mb-5 block w-[30rem] px-3 py-2 text-black border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </label>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-slate-200 relative"
          >
            Confirm Password
            {confirmPasswordVisible ? (
              <FaEyeSlash
                className="absolute left-[28rem] top-[2rem] text-black text-xl cursor-pointer"
                onClick={() => setConfirmPasswordVisible(false)}
              />
            ) : (
              <FaEye
                className="absolute left-[28rem] top-[2rem] text-black text-xl cursor-pointer "
                onClick={() => setConfirmPasswordVisible(true)}
              />
            )}
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Enter New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 mb-5 block w-[30rem] px-3 py-2 text-black border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </label>

          <Button color="green">Update</Button>
        </form>
      </div>
    </div>
  );
};

export default StudentChangePassword;
