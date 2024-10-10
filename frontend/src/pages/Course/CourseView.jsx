import React, { useEffect, useState } from "react";
import {
  useGetCourseByIdQuery,
  useCreateReviewMutation,
} from "../../redux/api/coursesApiSlice";
import { useParams } from "react-router";
import ShowTime from "../../components/ShowTime";
import VideoPopup from "../../components/VideoPopup";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import Ratings from "../../components/Ratings";
import ImageSlider from "../../components/ImageSlider";

const CourseView = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { id } = useParams();
  const [subContent, setSubContent] = useState(null);
  const [currIndex, setCurrIndex] = useState(0); // currentSubContentIndex
  const [cIndex, setCIndex] = useState(0); // currentContentIndex
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [ratingMove, setRatingMove] = useState(0);

  const { data: course, refetch } = useGetCourseByIdQuery(id);
  const [createReviewApi] = useCreateReviewMutation();

  const myReview = course?.reviews?.find(
    (review) => review?.user?._id === userInfo?._id
  );

  useEffect(() => {
    if (course) {
      setSubContent(course.content[0]?.subContent[0]);
    }
  }, [course]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReviewApi({
        id: course?._id,
        comment,
        rating,
      }).unwrap();
      toast.success("Review added successfully");
      refetch();
      setComment("");
      setRating(0);
      setRatingMove(0);
    } catch (error) {
      console.log(error, error?.data);
      toast.error(error?.data);
    }
  };

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
        <div className="mt-[5rem] flex flex-col justify-center items-center ">
          {myReview ? (
            <div className="text-white">
              <h1 className="text-xl mb-5">My Review : </h1>
              <div className="p-5 rounded-lg w-[50rem] mb-5 border">
                <div className="flex justify-between">
                  <strong>{myReview?.name}</strong>
                  <p>{myReview?.createdAt.substring(0, 10)}</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="my-4">{myReview?.comment}</p>
                    {myReview && <Ratings value={myReview?.rating} />}
                  </div>
                  <div>
                    <img
                      src={myReview.user.image}
                      className="border-2 rounded-full bg-white w-[3.5rem] h-[3.5rem] object-cover object-top mt-5"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
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
                      onClick={() => setRating(ind + 1)}
                      onMouseOver={() => setRatingMove(ind + 1)}
                      onMouseLeave={() => setRatingMove(rating)}
                    >
                      {ind + 1 <= (ratingMove || rating) ? (
                        <FaStar className="text-yellow-200 text-5xl mr-3 cursor-pointer" />
                      ) : (
                        <FaRegStar className="text-yellow-200 text-5xl mr-3 cursor-pointer" />
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
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
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
                <div
                  className="border-2 text-xl text-white bg-red-500 hover:bg-red-600 active:bg-red-700 hover:opacity-80 my-2 block px-3 py-2 text-center cursor-pointer whitespace-nowrap border-slate-300 rounded-md font-medium shadow-sm "
                  onClick={() => {
                    setComment("");
                    setRating(0);
                    setRatingMove(0);
                  }}
                >
                  Clear Review
                </div>
              </div>
            </form>
          )}
          <div className="w-[90%]">
            {course?.reviews?.length > 0 && (
              <div>
                <h1 className="text-xl my-5 mt-10 text-white">
                  Reviews from Students :
                </h1>
                <ImageSlider reviews={course?.reviews} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseView;
