import React, { useEffect, useRef, useState } from "react";
import { useGetCourseByIdQuery } from "../../redux/api/coursesApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useParams } from "react-router";
import moment from "moment";
import Modal from "../../components/Modal";
import { GrLanguage } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { FaCircle, FaFirefox } from "react-icons/fa";
import CourseCard from "./CourseCard";
import { IoIosArrowDown } from "react-icons/io";
import ShowTime from "../../components/ShowTime";
import Ratings from "../../components/Ratings";
import ImageSlider from "../../components/ImageSlider";
import { usePurchaseCourseMutation } from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { id } = useParams();
  const [activeIndex, setActiveIndex] = useState(null);
  const [difference, setDifference] = useState(null);
  const {
    data: course,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCourseByIdQuery(id);
  const [purchaseApi] = usePurchaseCourseMutation();

  const smallRef = useRef(null);
  const bigRef = useRef(null);
  useEffect(() => {
    refetch();
    if (bigRef.current && smallRef.current) {
      setDifference(
        bigRef.current.getBoundingClientRect().height -
          smallRef.current.getBoundingClientRect().height
      );
    }
  }, [refetch, course]);

  const boughtHandler = async (userId) => {
    try {
      const res = await purchaseApi({ userId, courseId: id }).unwrap();
      toast.success(res);
    } catch (error) {
      console.log(error?.error);
      toast.error(error?.error);
    }
  };

  return (
    <div className="text-white relative" ref={bigRef}>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="error">Error Occurred</Message>
      ) : (
        <div className="flex justify-between">
          <div>
            <div className="border-b-2">
              <div className="mt-[5rem] ml-[8rem] w-6/12">
                <h1 className="text-5xl font-bold py-6">{course.name}</h1>
                <h2 className="text-xl font-bold mb-4">{course.title}</h2>
                <h3 className="mb-4">Created By: {course.teacherName}</h3>
                <div className="flex gap-[10rem]">
                  <h3 className="flex flex-col gap-1">
                    <span className="flex items-center gap-[0.3rem]">
                      <MdDateRange />
                      Created At:{" "}
                      {moment(course.createdAt).format("MMM D, YYYY")}
                    </span>
                    <span className="flex items-center gap-[0.3rem]">
                      <GrLanguage />
                      English
                    </span>
                  </h3>
                  <h3 className="pb-5 flex flex-col gap-1">
                    <span className="flex items-center gap-[0.3rem]">
                      <MdDateRange />
                      Last Updated:{" "}
                      {moment(course.updatedAt).format("MMM D, YYYY")}
                    </span>
                    <span className="flex items-center gap-[0.3rem]">
                      <FaFirefox />
                      {course?.tags?.map((tag, i) => (
                        <div key={i}>{tag}</div>
                      ))}
                    </span>
                  </h3>
                </div>
                {course?.numReviews > 0 && (
                  <div className="mb-5 flex gap-2 items-center">
                    <h3 className="text-xl">Rating : </h3>
                    {course?.overallRating && course?.numReviews && (
                      <Ratings
                        value={course?.overallRating}
                        text={`${course?.numReviews} reviews`}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="border-2 p-5 mt-[5rem] ml-[8rem] w-6/12">
              <h2 className="text-3xl font-bold mb-5">What you'll learn ?</h2>
              <h2 className="grid grid-cols-2 gap-5">
                {course?.modules?.split("\n")?.map((module, index) => (
                  <div key={index} className="flex gap-[0.3rem]">
                    <h2>&#9989;</h2>
                    <h2>{module}</h2>
                  </div>
                ))}
              </h2>
            </div>
            <div className="p-5 mt-[5rem] ml-[8rem] w-6/12 border-2">
              <div className="flex justify-between">
                <h2 className="text-3xl font-bold mb-5">Course content</h2>
                <div>
                  <h3 className="ml-[1.2rem] mt-[0.5rem] mr-[0.5rem]">
                    <ShowTime time={course.totalTime} />
                  </h3>
                </div>
              </div>
              <div>
                <div className="p-5">
                  {course?.content?.map((item, index) => {
                    const accordionOpened = activeIndex === index;
                    return (
                      <div
                        key={index}
                        className={`flex relative ${
                          index == 0 ? "border-2" : "border-2 border-t-0"
                        } border-2 p-5`}
                      >
                        <div className="flex flex-col">
                          <div
                            className="flex"
                            onClick={() =>
                              setActiveIndex(
                                activeIndex === index ? null : index
                              )
                            }
                          >
                            <IoIosArrowDown
                              className={`text-xl cursor-pointer mr-1 ml-1 duration-150 ease-in-out ${
                                accordionOpened ? "rotate-180" : ""
                              }`}
                            />
                            <div className="cursor-pointer">
                              <div className="w-[25rem]">
                                {index + 1}.) {item.title}
                              </div>
                              <div className="absolute right-3 top-5">
                                <ShowTime time={item.time} />
                              </div>
                            </div>
                          </div>
                          <div>
                            {accordionOpened && (
                              <div className="mt-5">
                                {item?.subContent?.map((it, ind) => (
                                  <div key={ind} className="mt-1">
                                    <div
                                      onClick={() =>
                                        handleVideoClick(it.video, it.title)
                                      }
                                    >
                                      <div className="flex gap-3">
                                        <div>
                                          {ind + 1}) {it.title}:
                                        </div>
                                        <div className="w-[28rem]">
                                          {it.description}
                                        </div>
                                        <div className="absolute right-3">
                                          <ShowTime time={it.time} />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="border-2 p-5 mt-[5rem] ml-[8rem] w-6/12">
              <h2 className="text-3xl font-bold mb-5">Requirements</h2>
              <h2 className="grid gap-2">
                {course?.requirements
                  ?.split("\n")
                  ?.map((requirement, index) => (
                    <div key={index} className="flex gap-[0.3rem]">
                      <h2 className=" text-[0.5rem] mt-[0.5rem] mr-[0.2rem]">
                        <FaCircle />
                      </h2>
                      <h2>{requirement}</h2>
                    </div>
                  ))}
              </h2>
            </div>
            <div className="border-2 p-5 mt-[5rem] ml-[8rem] w-6/12">
              <h2 className="text-3xl font-bold mb-5">Description</h2>
              <h2 className="grid gap-2">
                {course?.description?.split("\n")?.map((desc, index) => (
                  <div key={index} className="flex gap-[0.3rem]">
                    <h2 className=" text-[0.5rem] mt-[0.5rem] mr-[0.2rem]">
                      <FaCircle />
                    </h2>
                    <h2>{desc}</h2>
                  </div>
                ))}
              </h2>
            </div>
            <div className="border-2 p-5 mt-[5rem] ml-[8rem] w-6/12">
              <h2 className="text-3xl font-bold mb-5">
                Who this course is for?
              </h2>
              <h2 className="grid gap-2">
                {course?.rightAudience?.split("\n")?.map((ra, index) => (
                  <div key={index} className="flex gap-[0.3rem]">
                    <h2 className=" text-[0.5rem] mt-[0.5rem] mr-[0.2rem]">
                      <FaCircle />
                    </h2>
                    <h2>{ra}</h2>
                  </div>
                ))}
              </h2>
            </div>
            <div className="p-5 mt-[3rem] ml-[7rem]">
              {course?.reviews?.length > 0 && (
                <div className="w-[80rem]">
                  <h1 className="text-3xl font-bold text-white mb-5">
                    Reviews from Students :
                  </h1>
                  <ImageSlider reviews={course?.reviews} />
                </div>
              )}
            </div>
            <div className="m-10" ref={smallRef}>
              <h1 className="mb-5 text-3xl font-bold">{`More Courses from ${course?.teacherName}:`}</h1>
              <div className="grid grid-cols-4 gap-10">
                {isLoading ? (
                  <Loader />
                ) : isError ? (
                  <Message variant="error">{error?.data}</Message>
                ) : (
                  course?.user?.coursesCreated
                    ?.filter(
                      (courseCreated) => courseCreated._id !== course._id
                    )
                    .map((course) => (
                      <CourseCard key={course._id} course={course} />
                    ))
                )}
              </div>
            </div>
          </div>
          <Modal
            course={course}
            difference={difference}
            boughtHandler={boughtHandler}
          />
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
