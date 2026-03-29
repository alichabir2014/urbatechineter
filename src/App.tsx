import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedSection from "./components/FeaturedSection";
import Projects from "./components/Projects";
import Ideas from "./components/Ideas";
import People from "./components/People";
import About from "./components/About";
import Podcast from "./components/Podcast";
import Footer from "./components/Footer";

function App() {
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return (
          <>
            <Hero setActivePage={setActivePage} />
            <FeaturedSection setActivePage={setActivePage} />
          </>
        );
      case "projects":
        return <Projects />;
      case "ideas":
        return <Ideas />;
      case "people":
        return <People />;
      case "about":
        return <About />;
      case "podcast":
        return <Podcast />;
      default:
        return <Hero setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      {renderPage()}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}

export default App;
