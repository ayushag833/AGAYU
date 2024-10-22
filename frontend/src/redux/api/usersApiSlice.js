import apiSlice from "./apiSlice";
import { UPLOADS_URL, USERS_URL } from "../constants";

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

    upload: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: `${UPLOADS_URL}`,
          method: "POST",
          body: formData,
        };
      },
    }),

    getAllUsers: builder.query({
      query: () => USERS_URL,
    }),

    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
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
      query: ({ id, ...data }) => ({
        url: `${USERS_URL}/password/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    purchaseCourse: builder.mutation({
      query: ({ ...data }) => ({
        url: `${USERS_URL}/purchaseCourse`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course", "User"],
    }),

    paymentCheck: builder.mutation({
      query: ({ ...data }) => ({
        url: `${USERS_URL}/paymentCheck`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course", "User"],
    }),

    showPurchasedCourses: builder.query({
      query: (id) => `${USERS_URL}/purchasedCourses/${id}`,
      providesTags: ["Course", "User"],
    }),

    showCreatedCourses: builder.query({
      query: (id) => `${USERS_URL}/createdCourses/${id}`,
      providesTags: ["Course", "User"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useUploadMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUpdatePasswordMutation,
  useShowPurchasedCoursesQuery,
  useShowCreatedCoursesQuery,
  usePurchaseCourseMutation,
  usePaymentCheckMutation,
} = userApiSlice;
