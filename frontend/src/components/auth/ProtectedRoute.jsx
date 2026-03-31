import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthTokenValid } from "../../utils/auth";

const ProtectedRoute = () => {
  const location = useLocation();

  if (!isAuthTokenValid()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
