import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { getSearchQuery } from "../../redux/slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { userLogout } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { GrLanguage } from "react-icons/gr";
import CustomModal from "../../components/CustomModal";

const Navbar = () => {
  const [data, setData] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const [LogoutMutation] = useLogoutMutation();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role") || userInfo?.role || "student";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/courses?search=${data}`);
    dispatch(getSearchQuery(data));
  };

  const logoutHandler = async () => {
    try {
      await LogoutMutation().unwrap();
      dispatch(userLogout());
      setIsDropdownVisible(false);
      navigate("/");
      toast.success("User logged out successfully!");
    } catch (error) {
      console.error(error.error);
      toast.error(error.error);
    }
  };

  const handleLogin = () => {
    setIsDropdownVisible(false);
    navigate(`/login?role=${role}`);
  };

  const handleSignup = () => {
    setIsDropdownVisible(false);
    navigate(`/signup?role=${role}`);
  };

  return (
    <div>
      <div className="flex bg-[#000] h-[5rem] border-b-2">
        <img
          src={logo}
          className="p-2 my-auto ml-5 cursor-pointer w-[5rem]"
          onClick={() => navigate("/")}
        />
        <h1
          className="p-2 text-2xl mr-5 my-auto font-semibold whitespace-nowrap text-slate-50 cursor-pointer bg-green-400 inline-block text-transparent bg-clip-text"
          onClick={() => navigate("/")}
        >
          AGAYU
        </h1>
        <nav className="my-auto p-2">
          <ul className="flex justify-center">
            <li
              className="p-2 text-base mx-5 my-auto font-medium text-slate-50 cursor-pointer duration-150 ease-in-out hover:opacity-80"
              onClick={() => navigate("/courses")}
            >
              Courses
            </li>
            <li
              className="p-2 text-base mx-5 my-auto font-medium text-slate-50 cursor-pointer duration-150 ease-in-out hover:opacity-80"
              onClick={() => navigate("/about")}
            >
              About
            </li>
            <li
              className="p-2 text-base mx-5 my-auto font-medium text-slate-50 cursor-pointer duration-150 ease-in-out hover:opacity-80"
              onClick={() => navigate("/contact")}
            >
              Contact
            </li>
          </ul>
        </nav>
        <div className="flex w-3/4">
          <form
            onSubmit={submitHandler}
            className="flex my-5 rounded-full w-3/5"
          >
            <h1 className="text-black relative left-3 top-[0.05rem] p-3 text-center rounded-tl-full rounded-bl-full text-base bg-slate-100 ">
              <FaSearch />
            </h1>
            <input
              type="text"
              placeholder="Search Anything"
              value={data}
              name="Course_Name"
              onChange={(e) => setData(e.target.value)}
              className="bg-slate-100 rounded-tr-full h-[2.5rem] rounded-br-full focus:outline-none w-full sm:w-11/12 text-base md:text-base"
            />
          </form>
          <div className="flex gap-5 mx-5 my-auto p-1 text-4xl cursor-pointer">
            <div
              onMouseOver={() => setIsDropdownVisible(true)}
              onMouseOut={() => setIsDropdownVisible(false)}
            >
              <img
                src={
                  userInfo?.image ||
                  "https://upload.wikimedia.org/wikipedia/commons/e/e0/Userimage.png"
                }
                className="bg-white rounded-full w-[35px] h-[35px] mt-1 object-cover object-top border-white border-[2px]"
                alt="User profile image"
              />
            </div>
            <div className="relative top-[1.8rem] right-[4.5rem] z-10">
              {isDropdownVisible && (
                <div>
                  {userInfo ? (
                    <div
                      className="text-sm absolute"
                      onMouseOver={() => setIsDropdownVisible(true)}
                      onMouseOut={() => setIsDropdownVisible(false)}
                    >
                      <div className="p-3">
                        <ul className="bg-slate-50 text-black border-2 border-gray-500 font-semibold text-sm p-3 text-md rounded-lg">
                          <li
                            className="hover:underline duration-150 ease-in-out hover:opacity-80 whitespace-nowrap"
                            onClick={() =>
                              navigate(
                                `/profile/${role}/update/${userInfo._id}`
                              )
                            }
                          >
                            {userInfo.fullName}
                          </li>
                          <li
                            onClick={logoutHandler}
                            className="hover:underline duration-150 ease-in-out hover:opacity-80 whitespace-nowrap"
                          >
                            Log out
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="text-sm absolute"
                      onMouseOver={() => setIsDropdownVisible(true)}
                      onMouseOut={() => setIsDropdownVisible(false)}
                    >
                      <ul className="bg-slate-50 text-black font-semibold text-sm p-3 w-20 h-16 text-md rounded-lg">
                        <li
                          onClick={handleLogin}
                          className="hover:underline duration-150 ease-in-out hover:opacity-80"
                        >
                          Log in
                        </li>
                        <li
                          onClick={handleSignup}
                          className="hover:underline duration-150 ease-in-out hover:opacity-80"
                        >
                          Sign up
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <BsCart3
                className="text-white text-3xl duration-150 ease-in-out hover:opacity-80"
                onClick={() => navigate("/cart")}
              />
            </div>
            <div
              className="text-white text-base mx-5 my-auto whitespace-nowrap duration-150 ease-in-out hover:opacity-80"
              onClick={() => navigate("/login?role=teacher")}
            >
              Teach on Agayu
            </div>
            <div
              className="text-white text-xl my-auto whitespace-nowrap duration-150 ease-in-out hover:opacity-80"
              onClick={() => setDropdown(true)}
            >
              <GrLanguage />
            </div>
          </div>
        </div>
      </div>
      {dropdown && <CustomModal setDropdown={setDropdown} />}
    </div>
  );
};

export default Navbar;
