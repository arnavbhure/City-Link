import Footer from "./components/Footer";
import Features from "./components/hero/Features";
import Heading from "./components/hero/HeadingMainContent";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
        <Navbar />
        {/* Hero Section */}
        <Heading />
        <Features />
        <Footer />
      </div>
    </>
  );
}

export default App;
