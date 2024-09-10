import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "../pages/Course/CourseCard";

const ImageSlider = ({ courses }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    waitForAnimate: true,
  };
  return (
    <div className="slider-container">
      <Slider {...settings} className="mt-5 m-auto justify-between">
        {console.log(courses)}
        {courses.map((course) => (
          <div className="p-5" key={course._id}>
            <CourseCard course={course} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
