import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../assets/banner-1.png";
import banner2 from "../assets/banner-2.png";
import banner3 from "../assets/banner-3.png";
import banner4 from "../assets/banner-4.png";

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    waitForAnimate: true,
  };
  return (
    <div>
      <Slider
        {...settings}
        className="mt-5 m-auto md:w-[90rem] sm:w-[40rem] sm:block"
      >
        <div>
          <img src={banner2} alt="banner-2" />
        </div>
        <div>
          <img src={banner1} alt="banner-1" />
        </div>
        <div>
          <img src={banner3} alt="banner-3" />
        </div>
        <div>
          <img src={banner4} alt="banner-4" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
