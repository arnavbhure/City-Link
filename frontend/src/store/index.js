import { configureStore } from "@reduxjs/toolkit";
import isLoginReducer from "./isLoggedIn";

const store = configureStore({
  reducer: { isLoggedIn: isLoginReducer },
});

export default store;
