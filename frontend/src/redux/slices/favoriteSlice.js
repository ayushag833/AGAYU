import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteItems: localStorage.getItem("favoriteItems")
    ? JSON.parse(localStorage.getItem("favoriteItems"))
    : [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addTofavorite: (state, action) => {
      const existItem = state.favoriteItems.find(
        (item) => item?._id === action.payload?._id
      );
      if (existItem) {
        return;
      }
      state.favoriteItems.push(action.payload);
      localStorage.setItem(
        "favoriteItems",
        JSON.stringify(state.favoriteItems)
      );
    },
    removeFromfavorite: (state, action) => {
      state.favoriteItems = state.favoriteItems.filter(
        (item) => item?._id !== action.payload
      );
      localStorage.setItem(
        "favoriteItems",
        JSON.stringify(state.favoriteItems)
      );
    },
    clearfavorite: (state) => {
      state.favoriteItems = [];
      localStorage.removeItem("favoriteItems");
    },
  },
});

export const { addTofavorite, removeFromfavorite, clearfavorite } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
