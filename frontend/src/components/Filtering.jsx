import Button from "./Button";

const Filtering = ({
  categories,
  handleCategoriesCheck,
  setCheckedCategories,
  checkedCategories,
  handleRatingsCheck,
  checkedRatings,
  setCheckedRatings,
}) => {
  const ratings = [
    <div style={{ fontSize: "1.1rem" }}>
      <span style={{ color: "yellow" }}>{Array(5).fill("★")}</span> 5
    </div>,
    <div style={{ fontSize: "1.1rem" }}>
      <span style={{ color: "yellow" }}>
        {Array(4).fill("★")}
        {Array(1).fill("☆")}
      </span>{" "}
      4 & up
    </div>,
    <div style={{ fontSize: "1.1rem" }}>
      <span style={{ color: "yellow" }}>
        {Array(3).fill("★")}
        {Array(2).fill("☆")}
      </span>{" "}
      3 & up
    </div>,
    <div style={{ fontSize: "1.1rem" }}>
      <span style={{ color: "yellow" }}>
        {Array(2).fill("★")}
        {Array(3).fill("☆")}
      </span>{" "}
      2 & up
    </div>,
    <div style={{ fontSize: "1.1rem" }}>
      <span style={{ color: "yellow" }}>
        {Array(1).fill("★")}
        {Array(4).fill("☆")}
      </span>{" "}
      1 & up
    </div>,
  ];

  return (
    <>
      <div className="mt-[2rem] ml-[2rem]">
        <div className="flex md:flex-row">
          <div className="bg-[#151515] mt-2 mb-2 border p-5">
            <h1 className="text-center py-2 text-2xl  mb-2 text-white">
              Filters
            </h1>
            <h2 className="text-center py-2 bg-black rounded-full mb-2 border text-white">
              Filter by Categories
            </h2>

            <div className="p-5 w-[15rem]">
              {categories?.AllCategories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4 mb-3">
                    <input
                      type="checkbox"
                      id={c._id}
                      onChange={(e) =>
                        handleCategoriesCheck(e.target.checked, c._id)
                      }
                      checked={checkedCategories?.includes(c._id)}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                    />

                    <label
                      htmlFor={c._id}
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.title}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 border text-white">
              Filter by Ratings
            </h2>
            <div className="p-5 w-[15rem]">
              {ratings.map((rating, ind) => (
                <div key={ind} className="mb-2">
                  <div className="flex items-center mr-4 mb-3">
                    <input
                      type="radio"
                      id={ind}
                      onChange={() => handleRatingsCheck(ratings.length - ind)}
                      checked={checkedRatings === ratings.length - ind}
                      className=" text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                    />

                    <label
                      htmlFor={ind}
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {rating}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 border text-white">
              Filter by Course Duration
            </h2> */}

            {/* <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 border text-white">
                Filer by Price
              </h2> */}

            {/* <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 border text-white">
                Filter by Levels
              </h2> */}

            {/* <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 border text-white">
                Filter by Language
              </h2> */}

            <div className="p-5 pt-0">
              <Button
                color="green"
                onClick={() => {
                  setCheckedCategories([]);
                  setCheckedRatings(null);
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filtering;
