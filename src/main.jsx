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
import DashBoard from "./components/auth/DashBoard/DashBoard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/legal", element: <Legal /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/dashboard", element: <DashBoard /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
