import React, { useEffect, useState } from "react";
import Filtering from "../components/Filtering";
import { useSearchParams } from "react-router-dom";
import { useFetchCoursesQuery } from "../redux/api/coursesApiSlice";
import CourseCard from "./Course/CourseCard";
import Button from "../components/Button";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");
  const [page, setPage] = useState(1);

  const { data: courses, refetch } = useFetchCoursesQuery({
    search: query,
    page,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="flex flex-col">
      <h1 className="text-white text-3xl text-center font-bold mt-[3rem] ml-[5rem]">
        {`Search Results for "${query}"`}
      </h1>
      <h1 className="text-white text-2xl text-center font-bold mt-[2rem] mb-[2rem] ml-[5rem]">
        {`${courses?.count} results found`}
      </h1>
      <div className="flex">
        <Filtering />
        <div className="mt-[2.5rem] ml-[3rem] grid grid-cols-3 h-fit gap-[2rem]">
          {courses?.courses?.map((course) => (
            <div className="ml-5" key={course._id}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center">
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
  );
};

export default SearchPage;
