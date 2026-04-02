import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    storeUserInfo: (state, action) => {
      return action.payload;
    },
    clearUserInfo: () => {
      return initialState;
    },
  },
});

export default userSlice.reducer;
export const userInfoActions = userSlice.actions;
