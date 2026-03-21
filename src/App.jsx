import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Features from "./components/hero/Features";
import Heading from "./components/hero/HeadingMainContent";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
        <Navbar />
        {/* Main Content */}
        <main className="grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
