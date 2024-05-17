import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginPic from "../../assets/loginPic.jpeg";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { userInformation } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import Button from "../../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginApi] = useLoginMutation();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const role = searchParams.get("role") || "student";

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await loginApi({
        email,
        password,
      }).unwrap();
      dispatch(userInformation(res));
      toast.success("User logged in successfully");
      navigate("/");
    } catch (error) {
      console.log(error, error.message);
      toast.error("Can't login User at this time. Try again later!");
    }
  };

  return (
    <div className="p-4 flex">
      <div>
        <form className="ml-10 mt-10" onSubmit={submitHandler}>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-200"
          >
            Enter Email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 mb-5 block w-[30rem] px-3 py-2 border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-red-500 focus:invalid:ring-red-500"
          />
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-200 relative"
          >
            Password
            {passwordVisible ? (
              <FaEyeSlash
                className="absolute left-[28rem] top-[2rem] text-black text-xl cursor-pointer"
                onClick={() => setPasswordVisible(false)}
              />
            ) : (
              <FaEye
                className="absolute left-[28rem] top-[2rem] text-black text-xl cursor-pointer "
                onClick={() => setPasswordVisible(true)}
              />
            )}
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 mb-5 block w-[30rem] px-3 py-2 text-black border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
      invalid:border-red-500 invalid:text-red-600
      focus:invalid:border-red-500 focus:invalid:ring-red-500"
            />
          </label>
          <Button color="green">Submit</Button>
        </form>

        <span className="ml-10 text-sm font-medium text-slate-200">
          Don't have an account?
        </span>
        <span
          className="ml-1 text-sm font-medium text-green-500 cursor-pointer hover:underline"
          onClick={() => navigate(`/signup?role=${role}`)}
        >
          Sign up
        </span>
      </div>
      <div className="m-auto">
        <img
          src={loginPic}
          alt=""
          className="w-[50rem] mt-8 xl:block md:hidden sm:hidden rounded-lg"
        />
      </div>
    </div>
  );
};

export default Login;
