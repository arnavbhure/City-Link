import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { checkIfTokenValid } from "./services/checkIfLoggedin";
import { isLoginActions } from "./store/isLoggedIn";
import loadUserInfo from "./utils/loadUserInfo";
import { userInfoActions } from "./store/user/userSlice";
import LoadingSpinner from "./components/DashBoard/Loading/LoadingSpinner";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const syncAuthState = async () => {
      const response = await checkIfTokenValid();
      setLoading(false);
      if (!isMounted) {
        return;
      }

      if (response.success && response.user?.id) {
        dispatch(isLoginActions.setLoginState({ user_id: response.user.id }));
        return;
      }

      dispatch(isLoginActions.removeLoginState());
    };

    void syncAuthState();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // useEffect for getting user info after user refreshes page
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const user = await loadUserInfo();
      setLoading(false);
      if (user) {
        dispatch(userInfoActions.storeUserInfo(user));
      }
    };
    fetchUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="mt-10">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
