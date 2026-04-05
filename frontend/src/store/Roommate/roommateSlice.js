import { createSlice } from "@reduxjs/toolkit";

const roommateSlice = createSlice({
  name: "roommates",
  initialState: [],
  reducers: {
    storeRoommateList: (state, action) => {
      return action.payload;
    },
  },
});

export default roommateSlice.reducer;
export const roommateActions = roommateSlice.actions;
