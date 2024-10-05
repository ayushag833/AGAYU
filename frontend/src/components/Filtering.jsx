import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useGetAllCategoriesQuery } from "../redux/api/categoriesApiSlice";
import Button from "./Button";
// import {
//   setCategories,
//   setProducts,
//   setChecked,
// } from "../redux/features/shop/shopSlice";
// import ProductCard from "./Products/ProductCard";

const Filtering = () => {
  const dispatch = useDispatch();
  //   const { categories, products, checked, radio } = useSelector(
  //     (state) => state.shop
  //   );
  const [values, setValues] = useState([50]);
  const categoriesQuery = useGetAllCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  //   const filteredProductsQuery = useGetFilteredProductsQuery({
  //     checked,
  //     radio,
  //   });

  //   useEffect(() => {
  //     if (!categoriesQuery.isLoading) {
  //       dispatch(setCategories(categoriesQuery.data));
  //     }
  //   }, [categoriesQuery.data, dispatch]);

  //   useEffect(() => {
  //     if (!checked.length || !radio.length) {
  //       if (!filteredProductsQuery.isLoading) {
  //         // Filter products based on both checked categories and price filter
  //         const filteredProducts = filteredProductsQuery.data.filter(
  //           (product) => {
  //             // Check if the product price includes the entered price filter value
  //             return (
  //               product.price.toString().includes(priceFilter) ||
  //               product.price === parseInt(priceFilter, 10)
  //             );
  //           }
  //         );

  //         dispatch(setProducts(filteredProducts));
  //       }
  //     }
  //   }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  //   const handleBrandClick = (brand) => {
  //     const productsByBrand = filteredProductsQuery.data?.filter(
  //       (product) => product.brand === brand
  //     );
  //     dispatch(setProducts(productsByBrand));
  //   };

  //   const handleCheck = (value, id) => {
  //     const updatedChecked = value
  //       ? [...checked, id]
  //       : checked.filter((c) => c !== id);
  //     dispatch(setChecked(updatedChecked));
  //   };

  // Add "All Brands" option to uniqueBrands
  //   const uniqueBrands = [
  //     ...Array.from(
  //       new Set(
  //         filteredProductsQuery.data
  //           ?.map((product) => product.brand)
  //           .filter((brand) => brand !== undefined)
  //       )
  //     ),
  //   ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="mx-[5rem]">
        <div className="flex md:flex-row">
          <div className="bg-[#151515] mt-2 mb-2 border p-5">
            <h1 className="text-center py-2 text-2xl  mb-2 text-white">
              Filters
            </h1>
            <h2 className="text-center py-2 bg-black rounded-full mb-2 border text-white">
              Filter by Categories
            </h2>

            <div className="p-5 w-[15rem]">
              {/* {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4 mb-3">
                    <input
                      type="checkbox"
                      id="red-checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                    />

                    <label
                      htmlFor="pink-checkbox"
                      className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))} */}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 border text-white">
              Filter by Ratings
            </h2>

            <div className="p-5">
              {/* {uniqueBrands?.map((brand) => (
                <div className="flex items-enter mr-4 mb-3" key={brand._id}>
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                  />

                  <label
                    htmlFor="pink-radio"
                    className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    {brand}
                  </label>
                </div>
              ))} */}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 border text-white">
              Filter by Course Duration
            </h2>

            <div className="p-5">
              {/* {uniqueBrands?.map((brand) => (
                <div className="flex items-enter mr-4 mb-3" key={brand._id}>
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                  />

                  <label
                    htmlFor="pink-radio"
                    className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    {brand}
                  </label>
                </div>
              ))} */}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 border text-white">
              Filter by Levels
            </h2>

            <div className="p-5">
              {/* {uniqueBrands?.map((brand) => (
                <div className="flex items-enter mr-4 mb-3" key={brand._id}>
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                  />

                  <label
                    htmlFor="pink-radio"
                    className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    {brand}
                  </label>
                </div>
              ))} */}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 border text-white">
              Filter by Language
            </h2>

            <div className="p-5">
              {/* {uniqueBrands?.map((brand) => (
                <div className="flex items-enter mr-4 mb-3" key={brand._id}>
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                  />

                  <label
                    htmlFor="pink-radio"
                    className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    {brand}
                  </label>
                </div>
              ))} */}
            </div>

            <h2 className="h4 text-center py-2 bg-black rounded-full mb-2 border text-white">
              Filer by Price
            </h2>

            <div className="p-5 w-[15rem] text-white"></div>

            <div className="p-5 pt-0">
              <Button color="green" onClick={() => window.location.reload()}>
                Reset
              </Button>
            </div>
          </div>

          <div className="p-3 w-full">
            {/* <div className="flex justify-center flex-wrap">
              <h2 className="text-center mb-2 mr-2 w-full h-5">
                {products?.length} Products
              </h2>
              <div className="flex flex-wrap">
                {products.length === 0
                  ? "Sorry, No Products Found!"
                  : products?.map((p) => (
                      <div className="p-3" key={p._id}>
                        <ProductCard p={p} />
                      </div>
                    ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filtering;
