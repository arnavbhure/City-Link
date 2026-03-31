import { createSlice } from "@reduxjs/toolkit";

const isLogInSlice = createSlice({
  name: "isLoggedIn",
  initialState: {
    user_id: null,
    isLogin: false,
  },
  reducers: {
    setLoginState: (state, action) => {
      state.user_id = action.payload.user_id;
      state.isLogin = true;
    },
    removeLoginState: (state) => {
      state.user_id = null;
      state.isLogin = false;
    },
  },
});

export default isLogInSlice.reducer;
export const isLoginActions = isLogInSlice.actions;
