import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { checkIfTokenValid } from "./services/checkIfLoggedin";
import { isLoginActions } from "./store/isLoggedIn";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const syncAuthState = async () => {
      const response = await checkIfTokenValid();

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
