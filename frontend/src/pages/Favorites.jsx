import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearfavorite } from "../redux/slices/favoriteSlice";
import CourseCard from "./Course/CourseCard";

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { favoriteItems } = useSelector((state) => state.favorite);

  return (
    <>
      <div className="flex justify-around items-start wrap mx-auto mt-8">
        {favoriteItems.length === 0 ? (
          <div className="flex justify-center items-center flex-col h-[30rem]">
            <h1 className="text-white text-3xl font-bold">
              Your Favorites is Empty!
            </h1>
            <Button
              color="green"
              customCSS="text-xl"
              onClick={() => navigate("/courses")}
            >
              Go to Courses
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold mb-4 text-white">
                Favorites
              </h1>
              <div className="grid grid-cols-4 gap-10 w-full">
                {favoriteItems.map((item) => (
                  <div key={item?._id}>
                    <CourseCard course={item} />
                  </div>
                ))}
              </div>
              <div className="w-full flex mt-10 justify-center items-center">
                <Button
                  color="red"
                  onClick={() => {
                    dispatch(clearfavorite());
                  }}
                  customCSS="text-xl"
                >
                  Clear Favorites
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Favorites;
