import React, { useEffect, useState } from "react";
import { useGetCourseByIdQuery } from "../../redux/api/coursesApiSlice";
import { useParams } from "react-router";
import ShowTime from "../../components/ShowTime";
import VideoPopup from "../../components/VideoPopup";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const CourseView = () => {
  const { id } = useParams();
  const { data: course } = useGetCourseByIdQuery(id);
  const [subContent, setSubContent] = useState(null);
  const [currIndex, setCurrIndex] = useState(0);
  const [cIndex, setCIndex] = useState(0);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [ratingMove, setRatingMove] = useState(0);

  useEffect(() => {
    if (course) {
      setSubContent(course.content[0]?.subContent[0]);
    }
  }, [course]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // const res = await updateApi({
      //   id: user._id,
      //   ...formData,
      // }).unwrap();
      toast.success("User updated successfully");
    } catch (error) {
      console.log(error, error.message);
      toast.error("Can't update User at this time. Try again later!");
    }
  };

  const ratingClick = (ind) => {
    setRating(ind + 1);
  };

  const ratingHover = (ind) => {};

  return (
    <div>
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
        <div className="flex items-center justify-center w-3/4 flex-col">
          <VideoPopup subContent={subContent} currIndex={currIndex} />
        </div>
      </div>
      <div>
        <div className="mt-[5rem] flex justify-center ">
          <form
            onSubmit={submitHandler}
            className="border p-10 rounded-md w-[50rem]"
          >
            <div>
              <label
                htmlFor="rating"
                className="block font-medium text-slate-100 text-2xl mb-5"
              >
                Give us a Rating:
              </label>
              <div className="flex mb-[3rem] justify-center items-center">
                {[...Array(5)].map((_, ind) => (
                  <div
                    key={ind}
                    className="flex justify-center items-center"
                    onClick={() => ratingClick(ind)}
                    onMouseMove={() => ratingHover(ind)}
                  >
                    {ratingMove ? (
                      <FaStar className="text-yellow-200 text-4xl" />
                    ) : (
                      <CiStar className="text-yellow-200 text-5xl" />
                    )}
                  </div>
                ))}
                {/* <FaStarHalfAlt /> */}
              </div>
            </div>
            <div>
              <label
                htmlFor="review"
                className="block font-medium text-slate-100 text-2xl mb-5"
              >
                Write a Review:
              </label>
              <textarea
                type="text"
                name="review"
                placeholder="Enter Review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="mt-1 mb-5 block w-full h-[10rem] px-3 py-2 text-xl resize-none border-slate-300 rounded-md shadow-sm placeholder-slate-400
           focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500
           invalid:border-red-500 invalid:text-red-600
           focus:invalid:border-red-500 focus:invalid:ring-red-500"
              ></textarea>
            </div>
            <div className="mt-5">
              <Button color="green" customCSS="border-2 text-xl" width>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CourseView;
