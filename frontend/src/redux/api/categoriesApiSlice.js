import apiSlice from "./apiSlice";
import { CATEGORY_URL } from "../constants";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: ({ ...data }) => ({
        url: CATEGORY_URL,
        method: "POST",
        body: data,
      }),
    }),

    getAllCategories: builder.query({
      query: () => CATEGORY_URL,
    }),

    getCategory: builder.query({
      query: (id) => `${CATEGORY_URL}/${id}`,
    }),

    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${CATEGORY_URL}/update/${id}`,
        method: "PUT",
        body: data,
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
