import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkIfTokenValid } from "../../services/checkIfLoggedin";
import { isLoginActions } from "../../store/isLoggedIn";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [authStatus, setAuthStatus] = useState("checking");

  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      const response = await checkIfTokenValid();

      if (!isMounted) {
        return;
      }

      if (response.success && response.user?.id) {
        dispatch(isLoginActions.setLoginState({ user_id: response.user.id }));
        setAuthStatus("authenticated");
        return;
      }

      dispatch(isLoginActions.removeLoginState());
      setAuthStatus("unauthenticated");
    };

    void verifySession();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (authStatus === "checking") {
    return null;
  }

  if (authStatus !== "authenticated") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
