import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "../pages/Course/CourseCard";
import Ratings from "./Ratings";
import "./ImageSlider.css";

const ImageSlider = ({ courses, reviews }) => {
  const courseSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    waitForAnimate: true,
  };
  const reviewSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    waitForAnimate: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="slider-container">
      {courses && (
        <Slider {...courseSettings}>
          {courses.map((course) => (
            <div className="p-5" key={course._id}>
              <CourseCard course={course} />
            </div>
          ))}
        </Slider>
      )}
      {reviews && (
        <Slider {...reviewSettings} className="reviewSlider">
          {reviews?.map((review) => (
            <div
              key={review._id}
              className="p-5 text-white rounded-lg mr-5 mb-5 border"
            >
              <div className="flex justify-between">
                <strong>{review.name}</strong>
                <p>{review.createdAt.substring(0, 10)}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="my-4">{review?.comment}</p>
                  <Ratings value={review?.rating} />
                </div>
                <div className="w-[3.5rem] border-2 bg-white rounded-full h-fit mt-5">
                  <img src={review.user.image} />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ImageSlider;
