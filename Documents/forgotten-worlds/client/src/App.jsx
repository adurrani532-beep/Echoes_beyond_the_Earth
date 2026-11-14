import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Starfield from "./components/Starfield.jsx";
import Scout from "./components/Scout.jsx";
import Toast from "./components/Toast.jsx";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import TimelinePage from "./pages/TimelinePage.jsx";
import MapPage from "./pages/MapPage.jsx";
import Quiz from "./pages/Quiz.jsx";
import About from "./pages/About.jsx";

const Machine = lazy(() => import("./pages/Machine.jsx"));

function NotFound() {
  return (
    <section className="page center">
      <h1>Lost in space 🛰️</h1>
      <p>That page drifted away.</p>
      <Link className="btn" to="/">Back to Earth</Link>
    </section>
  );
}

export default function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Starfield />
      <Navbar />
      <main id="main">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <Suspense fallback={<p className="page center">Loading…</p>}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/machine/:id" element={<Machine />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/map" element={<MapPage />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <Scout />
      <Toast />
    </>
  );
}
