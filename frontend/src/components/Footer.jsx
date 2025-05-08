import { useTranslation } from "react-i18next";
import Logo from "../assets/logo.png";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const { t } = useTranslation();

  const BottomFooter = ["privacy_policy", "cookie_policy", "terms"];
  const Resources = [
    "articles",
    "blog",
    "chart_sheet",
    "code_challenges",
    "docs",
    "projects",
    "videos",
    "workspaces",
  ];
  const Plans = ["paid_memberships", "for_students", "business_solutions"];
  const Community = ["forums", "chapters", "events"];
  const Company = ["about", "careers", "affiliates"];

  return (
    <div className="bg-richblack-800 text-white">
      <div className="flex lg:flex-row gap-8 items-center justify-between text-richblack-400 leading-6 mx-auto relative my-14">
        <div className="border-b border-t pt-10 w-full flex flex-col lg:flex-row pb-5">
          <div className=" flex flex-wrap flex-row justify-around pl-3 lg:pr-5 w-full">
            <div className="flex flex-col gap-3 mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[18px]">
                {t("company")}
              </h1>
              <div className="flex flex-col gap-2">
                {Company.map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[16px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      {t(ele)}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mb-7 lg:pl-0">
              <h1 className="text-richblack-50 font-semibold text-[18px]">
                {t("resources")}
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[16px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      {t(ele)}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h1 className="text-richblack-50 font-semibold text-[18px]">
                {t("support")}
              </h1>
              <div className="text-[16px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                {t("help_center")}
              </div>
            </div>

            <div className="mb-7 lg:pl-0 hidden md:block">
              <h1 className="text-richblack-50 font-semibold text-[18px]">
                {t("plans")}
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[16px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      {t(ele)}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h1 className="text-richblack-50 font-semibold text-[18px]">
                {t("community")}
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[16px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      {t(ele)}
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
                  {t(ele)}
                </div>
              );
            })}
          </div>

          <div className="text-center mr-[5rem]">
            {t("made_by")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;