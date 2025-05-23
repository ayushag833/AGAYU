import React, { useEffect, useState } from "react";
import Filtering from "../components/Filtering";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFetchCoursesMutation } from "../redux/api/coursesApiSlice";
import { useGetAllCategoriesQuery } from "../redux/api/categoriesApiSlice";
import Button from "../components/Button";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Ratings from "../components/Ratings";
import CustomTab from "../components/CustomTab";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedRatings, setCheckedRatings] = useState(null);

  const navigate = useNavigate();

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
    if (!query || query.trim().length === 0) return;
    const normalizedQuery = query.trim().replace(/\s+/g, " ");
    try {
      const res = await fetchCourses({
        search: normalizedQuery,
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
              <h1 className="text-white text-3xl ml-[5rem] font-bold mt-[3rem]">
                {`Sorry, No Courses found for "${query
                  .trim()
                  .replace(/\s+/g, " ")}"`}
              </h1>
              <h1 className="text-white text-2xl ml-[5.3rem] font-bold mt-[3rem]">
                Try adjusting your search. Here are some ideas:
              </h1>
              <h2 className="text-white text-xl ml-[6rem] font-bold mt-[1rem]">
                &#8226; Make sure all words are spelled correctly
              </h2>
              <h2 className="text-white text-xl ml-[6rem] font-bold">
                &#8226; Try different search terms
              </h2>
              <h2 className="text-white text-xl ml-[6rem] font-bold">
                &#8226; Try more general search terms
              </h2>
            </div>
          ) : (
            <div className="w-full">
              <h1 className="text-white text-3xl text-center font-bold mt-[3rem]">
                {`Search Results for "${query.trim().replace(/\s+/g, " ")}"`}
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
                <div className="mt-[2.5rem] ml-[3rem] w-[70%]">
                  {courses?.courses?.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-enter mb-[1rem] pb-5 justify-between border-b"
                    >
                      <div
                        className="flex cursor-pointer justify-between w-full"
                        onClick={() => navigate(`/course/${item._id}`)}
                      >
                        <div className="w-[18rem] h-[10rem]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>

                        <div className="flex-1 ml-4 text-2xl text-white">
                          {item.name}

                          <div className="mt-1 text-white text-[1.1rem]">
                            {item.teacherName}
                          </div>
                          <div className="text-white text-[0.9rem]">
                            {item.title}
                          </div>

                          <div className="mt-[-0.2rem] ml-[-0.2rem] flex gap-2 items-center text-[0.9rem]">
                            {item?.overallRating && item?.numReviews && (
                              <Ratings
                                value={item?.overallRating}
                                text={`${item?.numReviews} reviews`}
                              />
                            )}
                          </div>
                          <div className="mt-2 flex gap-2 items-center text-sm">
                            {item?.tags?.map((tag, i) => (
                              <CustomTab variant="outside" key={i}>
                                {tag}
                              </CustomTab>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-white font-bold whitespace-nowrap">
                        $ {item.price}
                      </div>
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
