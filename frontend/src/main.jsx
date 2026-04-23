import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/hero/HomePage.jsx";
import About from "./components/hero/About.jsx";
import ContactUs from "./components/hero/ContactUs.jsx";
import Legal from "./components/hero/Legal.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import Login from "./components/auth/Login.jsx";
import ForgotPassword from "./components/auth/ForgotPassword.jsx";
import DashBoard from "./components/DashBoard/DashBoard.jsx";
import ExploreHousing from "./components/DashBoard/Housing/ExploreHousing.jsx";
import ExploreRoomates from "./components/DashBoard/Roomates/ExploreRoomates.jsx";
import ErrorPage, { RouteErrorBoundary } from "./ErrorPage.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import CompleteProfile from "./components/DashBoard/CompleteProfile/CompleteProfile.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";
import PostListing from "./components/DashBoard/PostListing/PostListing.jsx";
import UserProfilePage from "./components/Profile/UserProfilePage.jsx";

if (typeof document !== "undefined") {
  document.documentElement.dataset.theme = "dark";
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/about", element: <About /> },
      { path: "/contactus", element: <ContactUs /> },
      { path: "/legal", element: <Legal /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/dashboard", element: <DashBoard /> },
          { path: "dashboard/explore-roomates", element: <ExploreRoomates /> },
          { path: "dashboard/explore-housing", element: <ExploreHousing /> },
          { path: "dashboard/post-listing", element: <PostListing /> },
          { path: "/complete-profile", element: <CompleteProfile /> },
          { path: "/view-profile/:id", element: <UserProfilePage /> },
        ],
      },
      { path: "*", element: <ErrorPage embedded /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
