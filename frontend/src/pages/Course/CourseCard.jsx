import React from "react";
import { useNavigate } from "react-router-dom";
import CustomTab from "../../components/CustomTab";
import HeartIcon from "../HeartIcon";
import { useTranslation } from "react-i18next";

const CourseCard = ({ course, condition }) => {
  if (!course.approvedByAdmin || !course.readyToPublished) return null;
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex flex-col justify-between text-white mb-5 hover:scale-105 duration-150 ease-in-out">
        <div
          className="cursor-pointer"
          onClick={() => navigate(`/course/${course._id}`)}
        >
          <div className="relative">
            <img
              src={course?.image}
              alt="course-image"
              className="rounded-md w-[20rem] h-[12rem]"
            />
            <div>
              <HeartIcon course={course} css={true} condition={condition} />
            </div>
            <div>
              <h2 className="mt-1 mx-1">{t(`${course?.name}`)}</h2>
              <h3 className="mx-1">{t(`${course?.teacherName}`)}</h3>
            </div>
          </div>
          <div className="flex justify-between items-center w-[20rem] gap-2 mt-1">
            <div className="ml-1">
              {course?.tags?.map((tag, i) => (
                <CustomTab variant="outside" customCSS="mt-1" key={i}>
                  {t(`${tag}`)}
                </CustomTab>
              ))}
            </div>
            <div className="mr-1 flex flex-col gap-2 justify-center">
              <CustomTab variant="inside" customCSS="mr-1">
                &#8377;{course?.price}
              </CustomTab>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
