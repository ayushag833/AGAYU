import Button from "./Button";

const Filtering = ({
  categories,
  handleCategoriesCheck,
  setCheckedCategories,
  checkedCategories,
}) => {
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
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
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
            {/* 
              <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 border text-white">
                Filter by Ratings
              </h2>

              <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 border text-white">
                Filter by Course Duration
              </h2>

              <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 border text-white">
                Filter by Levels
              </h2>

              <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 border text-white">
                Filter by Language
              </h2>

              <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 border text-white">
                Filer by Price
              </h2> */}

            <div className="p-5 w-[15rem] text-white"></div>

            <div className="p-5 pt-0">
              <Button color="green" onClick={() => setCheckedCategories([])}>
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
