import apiSlice from "./apiSlice";
import { COURSES_URL } from "../constants";

const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewCourse: builder.mutation({
      query: (data) => ({
        url: COURSES_URL,
        method: "POST",
        body: data,
      }),
    }),

    fetchAllCourses: builder.query({
      query: () => COURSES_URL,
    }),

    fetchCourses: builder.query({
      query: ({ search, page }) =>
        `${COURSES_URL}/search/?search=${search}&page=${page}`,
    }),

    getLatestCourses: builder.query({
      query: () => `${COURSES_URL}/latest`,
    }),

    getPopularCourses: builder.query({
      query: () => `${COURSES_URL}/popular`,
    }),

    getBudgetCourses: builder.query({
      query: () => `${COURSES_URL}/budget`,
    }),

    getCourseById: builder.query({
      query: (id) => `${COURSES_URL}/${id}`,
    }),

    updateCourse: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${COURSES_URL}/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `${COURSES_URL}/delete/${id}`,
        method: "DELETE",
      }),
    }),

    approveCourse: builder.mutation({
      query: ({ ...data }) => ({
        url: `${COURSES_URL}/approve`,
        method: "PUT",
        body: data,
      }),
    }),

    createReview: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${COURSES_URL}/${id}/reviews`,
        method: "POST",
        body: data,
      }),
    }),

    getFilteredProducts: builder.query({
      query: ({ ...data }) => ({
        url: `${COURSES_URL}/filterCourses`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateNewCourseMutation,
  useFetchAllCoursesQuery,
  useFetchCoursesQuery,
  useGetLatestCoursesQuery,
  useGetBudgetCoursesQuery,
  useGetPopularCoursesQuery,
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useApproveCourseMutation,
  useCreateReviewMutation,
} = coursesApiSlice;
