import { configureStore } from "@reduxjs/toolkit";
import isLoginReducer from "./isLoggedIn";
import userSliceReducer from "./user/userSlice";
import roommatesReducer from "../store/Roommate/roommateSlice";
import chatReducer from "./chat/chatSlice";

const store = configureStore({
  reducer: {
    isLoggedIn: isLoginReducer,
    user: userSliceReducer,
    roommates: roommatesReducer,
    chat: chatReducer,
  },
});

export default store;
