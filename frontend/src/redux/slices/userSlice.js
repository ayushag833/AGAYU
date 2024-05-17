import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInformation: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
    },
    userLogout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { userInformation, userLogout } = userSlice.actions;
export default userSlice.reducer;
