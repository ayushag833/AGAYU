import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const {
      user: { userInfo },
    } = getState();
    headers.set("Authorization", `Bearer ${userInfo?.token}`);
    return headers;
  },
});

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Course", "Category"],
  endpoints: () => ({}),
});

export default apiSlice;
