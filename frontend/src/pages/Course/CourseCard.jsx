import React from "react";
import { useNavigate } from "react-router-dom";
import CustomTab from "../../components/CustomTab";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col justify-between text-white mb-5 cursor-pointer hover:scale-105 duration-150 ease-in-out"
      onClick={() => navigate(`/course/${course._id}`)}
    >
      <div>
        <img
          src={course.image}
          alt="course-image"
          className="rounded-md w-[10rem]"
        />
        <h2 className="mt-1 mx-1">{course.name}</h2>
        <h3 className="mx-1">{course.teacherName}</h3>
      </div>
      <div className="flex justify-between items-center w-[20rem] gap-2">
        <div className="ml-1">
          {course?.tags?.map((tag, i) => (
            <CustomTab variant="outside" customCSS="mt-1" key={i}>
              {tag}
            </CustomTab>
          ))}
        </div>
        <div className="mr-1 flex flex-col gap-2 justify-center">
          <CustomTab variant="inside" customCSS="mr-1">
            &#8377;{course.price}
          </CustomTab>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
