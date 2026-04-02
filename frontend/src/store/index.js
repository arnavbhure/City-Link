import { configureStore } from "@reduxjs/toolkit";
import isLoginReducer from "./isLoggedIn";
import userSliceReducer from "./user/userSlice";

const store = configureStore({
  reducer: { isLoggedIn: isLoginReducer, user: userSliceReducer },
});

export default store;
