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
  }),
});

export const {
  useCreateNewCourseMutation,
  useFetchAllCoursesQuery,
  useGetLatestCoursesQuery,
  useGetBudgetCoursesQuery,
  useGetPopularCoursesQuery,
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesApiSlice;
