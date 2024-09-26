import apiSlice from "./apiSlice";
import { CATEGORY_URL } from "../constants";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: ({ title }) => ({
        url: CATEGORY_URL,
        method: "POST",
        body: title,
      }),
    }),

    getAllCategories: builder.query({
      query: () => CATEGORY_URL,
    }),

    getCategory: builder.query({
      query: (id) => `${CATEGORY_URL}/${id}`,
    }),

    updateCategory: builder.mutation({
      query: ({ id, title }) => ({
        url: `${CATEGORY_URL}/update/${id}`,
        method: "PUT",
        body: title,
      }),
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
