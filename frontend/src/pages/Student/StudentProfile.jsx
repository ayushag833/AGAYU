import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router";
import { useUpdateUserMutation } from "../../redux/api/usersApiSlice";
import { userInformation } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import StudentMenu from "./StudentMenu";

const StudentProfile = () => {
  const userDetails = useSelector((state) => state.user);
  const user = userDetails?.userInfo;

  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupApi] = useSignupMutation();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const role = searchParams.get("role") || "student";

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      toast.error("Password do not match!");
      return;
    }
    try {
      const res = await signupApi({
        fullName,
        email,
        password,
        role,
      }).unwrap();
      dispatch(userInformation(res));
      toast.success("User created successfully");
      navigate("/");
    } catch (error) {
      console.log(error, error.message);
      toast.error("Can't create User at this time. Try again later!");
    }
  };

  return (
    <div className="flex">
      <div className="w-[20rem]">
        <StudentMenu />
      </div>
      <div className="w-[30rem]">
        <form className="ml-10 mt-10" onSubmit={submitHandler}>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-slate-200"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            disabled
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            className="mt-1 mb-5 block w-[30rem] px-3 py-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-red-500 focus:invalid:ring-red-500"
          />
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-200"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 mb-5 block w-[30rem] px-3 py-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-red-500 focus:invalid:ring-red-500"
          />
          <Button color="green">Update</Button>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
