import { configureStore } from "@reduxjs/toolkit";
import isLoginReducer from "./isLoggedIn";
import userSliceReducer from "./user/userSlice";
import roommatesReducer from "../store/Roommate/roommateSlice";

const store = configureStore({
  reducer: {
    isLoggedIn: isLoginReducer,
    user: userSliceReducer,
    roommates: roommatesReducer,
  },
});

export default store;
