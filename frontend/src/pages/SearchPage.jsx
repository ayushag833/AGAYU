import React, { useEffect, useState } from "react";
import Filtering from "../components/Filtering";
import { useSearchParams } from "react-router-dom";
import { useFetchCoursesMutation } from "../redux/api/coursesApiSlice";
import { useGetAllCategoriesQuery } from "../redux/api/categoriesApiSlice";
import CourseCard from "./Course/CourseCard";
import Button from "../components/Button";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedRatings, setCheckedRatings] = useState(null);

  const { data: categories } = useGetAllCategoriesQuery();
  const [fetchCourses, { isLoading, isError, error }] =
    useFetchCoursesMutation();

  useEffect(() => {
    submitHandler();
  }, [page, checkedCategories, checkedRatings, query]);

  const handleCategoriesCheck = (isChecked, categoryId) => {
    setCheckedCategories((prevChecked) => {
      if (isChecked) {
        return prevChecked.includes(categoryId)
          ? prevChecked
          : [...prevChecked, categoryId];
      } else {
        return prevChecked.filter((id) => id !== categoryId);
      }
    });
  };

  const handleRatingsCheck = (ratingValue) => {
    setCheckedRatings(ratingValue);
  };

  const submitHandler = async () => {
    try {
      const res = await fetchCourses({
        search: query,
        page,
        category: checkedCategories,
        overallRating: checkedRatings,
      }).unwrap();
      setCourses(res);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.Error);
    }
  };
  return (
    <div className="flex w-full justify-center items-center h-full">
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : isError ? (
        <Message variant="error">{error?.data?.data || error.error}</Message>
      ) : (
        <div className="w-full">
          {courses === undefined || courses?.count === 0 ? (
            <div className="w-full">
              <h1 className="text-white text-3xl text-center font-bold mt-[3rem]">
                {query == null
                  ? "Please, Enter something in the search bar"
                  : `Sorry, No Courses found for "${query}"`}
              </h1>
              <Filtering
                categories={categories}
                handleCategoriesCheck={handleCategoriesCheck}
                setCheckedCategories={setCheckedCategories}
                checkedCategories={checkedCategories}
                handleRatingsCheck={handleRatingsCheck}
                checkedRatings={checkedRatings}
                setCheckedRatings={setCheckedRatings}
              />
            </div>
          ) : (
            <div className="w-full">
              <h1 className="text-white text-3xl text-center font-bold mt-[3rem]">
                {`Search Results for "${query}"`}
              </h1>
              <h1 className="text-white text-2xl text-center font-bold mt-[2rem] mb-[2rem]">
                {`${courses?.count} results found`}
              </h1>
              <div className="flex">
                <Filtering
                  categories={categories}
                  handleCategoriesCheck={handleCategoriesCheck}
                  setCheckedCategories={setCheckedCategories}
                  checkedCategories={checkedCategories}
                  handleRatingsCheck={handleRatingsCheck}
                  checkedRatings={checkedRatings}
                  setCheckedRatings={setCheckedRatings}
                />
                <div className="mt-[2.5rem] ml-[3rem] grid grid-cols-3 h-fit gap-[2rem]">
                  {courses?.courses?.map((course) => (
                    <div className="ml-5" key={course._id}>
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center mt-10">
                <div className="flex justify-center items-center w-fit gap-5">
                  <Button
                    color="green"
                    disabled={page == 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Prev
                  </Button>
                  {[...Array(courses?.pages)].map((_, ind) => (
                    <div
                      className={`text-white cursor-pointer ${
                        page == ind + 1 ? "border p-2 rounded-xl" : ""
                      }`}
                      onClick={() => setPage(ind + 1)}
                      key={ind}
                    >
                      {ind + 1}
                    </div>
                  ))}
                  <Button
                    color="green"
                    disabled={page == courses?.pages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
