import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoMdSearch } from "react-icons/io";
import { BsCart3 } from "react-icons/bs";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { userLogout } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { GrLanguage } from "react-icons/gr";
import CustomModal from "../../components/CustomModal";
import { FaHeart } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";
import { MdLogin } from "react-icons/md";

const Navbar = () => {
  const [data, setData] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { favoriteItems } = useSelector((state) => state.favorite);
  const [LogoutMutation] = useLogoutMutation();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role") || userInfo?.role || "student";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const submitHandler = (e) => {
    if (data.trim().length === 0) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    navigate(`/searchPage?search=${data}`);
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
              className="p-2 text-md mx-3 my-auto font-medium text-slate-50 cursor-pointer duration-150 ease-in-out hover:opacity-80"
              onClick={() => navigate("/courses")}
            >
              Courses
            </li>
            <li
              className="p-2 text-md mx-3 my-auto font-medium text-slate-50 cursor-pointer duration-150 ease-in-out hover:opacity-80"
              onClick={() => navigate("/about")}
            >
              About
            </li>
            <li
              className="p-2 text-md mx-3 my-auto font-medium text-slate-50 cursor-pointer duration-150 ease-in-out hover:opacity-80"
              onClick={() => navigate("/contact")}
            >
              Contact
            </li>
          </ul>
        </nav>
        <div className="flex w-3/4">
          <form onSubmit={submitHandler} className="flex my-5 w-[70%] relative">
            <IoMdSearch className="text-black p-2 absolute text-center top-[0.15rem] left-[0.15rem] rounded-full text-[2.3rem] bg-slate-100" />
            <input
              type="text"
              placeholder="Search Anything"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="bg-slate-100 rounded-full pl-[2.4rem] h-[2.5rem] focus:outline-none w-full text-base"
            />
          </form>
          <div className="flex gap-5 mx-5 my-auto p-1 text-4xl justify-center items-center">
            <div
              onMouseOver={() => setIsDropdownVisible(true)}
              onMouseOut={() => setIsDropdownVisible(false)}
              className="relative left-2 w-[2.2rem]"
            >
              <img
                src={
                  userInfo?.image ||
                  "https://upload.wikimedia.org/wikipedia/commons/e/e0/Userimage.png"
                }
                className="bg-white rounded-full cursor-pointer w-[35px] h-[35px] mt-1 object-cover object-top border-white border-[2px]"
                alt="User profile image"
              />
            </div>
            <div className="relative top-[1rem] right-[4.5rem] z-10">
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
                            className="hover:underline duration-150 ease-in-out hover:opacity-80 whitespace-nowrap flex ml-0 items-center gap-1 text-md cursor-pointer"
                            onClick={() =>
                              navigate(
                                `/profile/${role}/update/${userInfo._id}`
                              )
                            }
                          >
                            <RxDashboard className="text-lg" />
                            {userInfo.fullName}
                          </li>
                          <li
                            onClick={logoutHandler}
                            className="hover:underline duration-150 ease-in-out hover:opacity-80 whitespace-nowrap flex items-center gap-1 text-md cursor-pointer"
                          >
                            <IoLogOutOutline className="text-lg" /> Log out
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
                      <ul className="bg-slate-50 relative top-3 left-3 text-black border-2 border-gray-500 font-semibold text-sm p-3 text-md rounded-lg">
                        <li
                          onClick={handleLogin}
                          className="hover:underline duration-150 ease-in-out hover:opacity-80 whitespace-nowrap flex items-center gap-1 text-md cursor-pointer"
                        >
                          <MdLogin className="text-lg" /> Log in
                        </li>
                        <li
                          onClick={handleSignup}
                          className="hover:underline duration-150 ease-in-out hover:opacity-80 whitespace-nowrap flex items-center gap-1 text-md cursor-pointer"
                        >
                          <MdLogin className="text-lg" /> Sign up
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
            {userInfo ? (
              <div className="flex gap-8 justify-center items-center">
                <div className="flex items-center relative cursor-pointer">
                  <BsCart3
                    className="text-white text-3xl duration-150 ease-in-out hover:opacity-80"
                    onClick={() => navigate("/cart")}
                  />
                  <span className="absolute left-4 bottom-5 text-sm h-[1.2rem] w-[1.2rem] rounded-full text-center text-white bg-green-500">
                    {cartItems.length}
                  </span>
                </div>
                <div className="flex items-center relative cursor-pointer">
                  <FaHeart
                    className="text-white text-3xl duration-150 ease-in-out hover:opacity-80"
                    onClick={() => navigate("/favorites")}
                  />
                  <span className="absolute left-4 bottom-5 text-sm h-[1.2rem] w-[1.2rem] rounded-full text-center text-white bg-green-500">
                    {favoriteItems.length}
                  </span>
                </div>
              </div>
            ) : (
              <div
                className="text-white text-base whitespace-nowrap duration-150 cursor-pointer ease-in-out hover:opacity-80"
                onClick={() => navigate("/login?role=teacher")}
              >
                Teach on Agayu
              </div>
            )}
            <div
              className="text-white text-2xl ml-3 my-auto whitespace-nowrap cursor-pointer duration-150 ease-in-out hover:opacity-80"
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
