// component for rendering in navbar if the user is logged in or not
import { useDispatch, useSelector } from "react-redux";
import { isLoginActions } from "../../store/isLoggedIn";
import { clearStoredAuth } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./profileDropdown";
import api from "../../api/axios";

export const LoggedInUserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnLogout = async () => {
    dispatch(isLoginActions.removeLoginState());
    await api.post("/auth/logout");
    clearStoredAuth();
    navigate("/login");
  };

  return <ProfileDropdown handleOnLogout={handleOnLogout} />;
};

export const IsLoggedInMobile = () => {
  const isLogin = useSelector((store) => store.isLoggedIn.isLogin); // returns a value checks if user is logged in or not
  return (
    <>
      {isLogin ? (
        <LoggedInUserMenu />
      ) : (
        <>
          <a
            href="/login"
            className="text-lg w-full text-center px-4 py-3 text-slate-300 hover:text-white font-medium rounded-md hover:bg-white/5 transition-colors duration-200 active:scale-95"
          >
            Sign in
          </a>
          <a
            href="/signup"
            className="w-full text-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors duration-200 active:scale-95"
          >
            Get Started
          </a>
        </>
      )}
    </>
  );
};

export const IsLoggedInDesktop = () => {
  const isLogin = useSelector((state) => state.isLoggedIn.isLogin); // returns a value chjecks if user is logged in or not
  return (
    <>
      {isLogin ? (
        <LoggedInUserMenu />
      ) : (
        <>
          <a
            href="/login"
            className="hover:cursor-pointer text-slate-100 hover:text-indigo-300 font-medium transition-colors duration-200 active:scale-95"
            style={{ fontSize: "1.15rem" }}
          >
            Sign In
          </a>
          <a
            href="/signup"
            className="hover:cursor-pointer bg-indigo-600 text-lg bg-blend-color-burn hover:bg-indigo-500 text-white font-medium px-5 py-2 rounded-full border border-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-white/5 active:scale-95"
            style={{ fontSize: "1.01rem" }}
          >
            Sign Up
          </a>
        </>
      )}
    </>
  );
};
