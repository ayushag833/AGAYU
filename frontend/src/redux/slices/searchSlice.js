import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
  },
  reducers: {
    getSearchQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { getSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
