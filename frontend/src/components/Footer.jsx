import Logo from "../assets/logo.png";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-richblack-800 text-white">
      <div className="flex lg:flex-row gap-8 items-center justify-between text-richblack-400 leading-6 mx-auto relative my-14">
        <div className="border-b border-t pt-10 w-full flex flex-col lg:flex-row pb-5">
          <div className=" flex flex-wrap flex-row justify-around pl-3 lg:pr-5 w-full">
            <div className="flex flex-col gap-3 mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[18px]">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[16px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      {ele}
                    </div>
                  );
                })}
              </div>

              <div></div>
            </div>

            <div className="mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[18px]">
                Resources
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[16px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      {ele}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h1 className="text-richblack-50 font-semibold text-[18px]">
                Support
              </h1>
              <div className="text-[16px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                Help Center
              </div>
            </div>

            <div className="mb-7 lg:pl-0 hidden md:block">
              <h1 className="text-richblack-50 font-semibold text-[18px]">
                Plans
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[16px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      {ele}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h1 className="text-richblack-50 font-semibold text-[18px]">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[16px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      {ele}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-3 mb-7 lg:pl-0">
              <img src={Logo} alt="" className="w-[5rem]" />
              <h1 className="text-[16px] ml-3 cursor-pointer hover:text-richblack-50 transition-all duration-200">
                Agayu
              </h1>
              <div className="flex gap-5 text-lg ml-3">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between text-richblack-400 ml-[5rem] pb-14 text-sm">
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 `}
                >
                  {ele}
                </div>
              );
            })}
          </div>

          <div className="text-center mr-[5rem]">
            Made by Ayush Aggarwal 🗿 © 2024 Agayu
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
