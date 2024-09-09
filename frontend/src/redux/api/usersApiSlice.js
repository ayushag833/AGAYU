import apiSlice from "./apiSlice";
import { USERS_URL } from "../constants";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    getAllUsers: builder.query({
      query: () => USERS_URL,
    }),

    updateUser: builder.mutation({
      query: (id, ...data) => ({
        url: `${USERS_URL}/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/delete/${id}`,
        method: "DELETE",
      }),
    }),

    updatePassword: builder.mutation({
      query: (id, ...data) => ({
        url: `${USERS_URL}/password/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    showPurchasedCourses: builder.query({
      query: (id) => `${USERS_URL}/courses/${id}`,
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useShowPurchasedCoursesQuery,
  useUpdatePasswordMutation,
} = userApiSlice;
