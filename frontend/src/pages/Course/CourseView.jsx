import React, { useEffect, useState } from "react";
import { useGetCourseByIdQuery } from "../../redux/api/coursesApiSlice";
import { useParams } from "react-router";
import ShowTime from "../../components/ShowTime";
import VideoPopup from "../../components/VideoPopup";
import { FaArrowLeft } from "react-icons/fa";

const CourseView = () => {
  const { id } = useParams();
  const { data: course } = useGetCourseByIdQuery(id);
  const [subContent, setSubContent] = useState(null);
  const [currIndex, setCurrIndex] = useState(0);
  const [cIndex, setCIndex] = useState(0);
  useEffect(() => {
    if (course) {
      setSubContent(course.content[0]?.subContent[0]);
    }
  }, [course]);
  return (
    <div className="flex">
      <div className="text-white w-1/4 mt-5 ml-3">
        {course?.content?.map((item, index) => {
          return (
            <div key={index}>
              <div
                className={`flex relative ${
                  index == 0 ? "border" : "border border-t-0"
                } border p-5`}
              >
                <div className="flex flex-col">
                  <div className="flex">
                    <div>
                      <div>
                        {index + 1}.) {item.title}
                      </div>
                      <div className="absolute right-3 top-5">
                        <ShowTime time={item.time} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-5">
                      {item?.subContent?.map((it, ind) => (
                        <div key={ind} className="mt-1">
                          <div className="flex gap-3">
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                setCurrIndex(ind);
                                setCIndex(index);
                                setSubContent(it);
                              }}
                            >
                              <div className="flex justify-center items-center">
                                {ind + 1}) {it.title}:
                                {ind === currIndex && index === cIndex && (
                                  <FaArrowLeft className="ml-2" />
                                )}
                              </div>
                            </div>
                            <div className="absolute right-3">
                              <ShowTime time={it.time} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center w-3/4">
        <VideoPopup subContent={subContent} currIndex={currIndex} />
      </div>
    </div>
  );
};
export default CourseView;
