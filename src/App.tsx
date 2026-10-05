import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

// Start downloading the 3D character code immediately on every device (faster loading screen)
const characterImport = () => import("./components/Character");
characterImport();
const CharacterModel = lazy(characterImport);
const MainContainer = lazy(() => import("./components/MainContainer"));
const MyWorks = lazy(() => import("./pages/MyWorks"));
const Play = lazy(() => import("./pages/Play"));
import { LoadingProvider } from "./context/LoadingProvider";

// The home page (with the 3D character) is mounted ONCE and never removed.
// "/myworks" and "/play" open as a full-screen layer on top of it. So when you
// go back, nothing is rebuilt: no new loading screen, no new 3D scene, no freeze,
// and you land at exactly the same scroll position.
const Home = () => (
  <LoadingProvider>
    <Suspense>
      <MainContainer>
        <Suspense>
          <CharacterModel />
        </Suspense>
      </MainContainer>
    </Suspense>
  </LoadingProvider>
);

// Full-screen layer for the other pages. While it is open the home page is
// frozen underneath (smooth-scroll paused, 3D render loop paused).
const PageLayer = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("overlay-open");
    ref.current?.scrollTo(0, 0);
    let cancelled = false;
    import("./components/Navbar").then((m) => {
      if (!cancelled) m.lenis?.stop();
    });
    return () => {
      cancelled = true;
      document.body.classList.remove("overlay-open");
      // tell the home page videos to start playing again
      setTimeout(() => window.dispatchEvent(new Event("home-visible")), 50);
      setTimeout(() => window.dispatchEvent(new Event("home-visible")), 500);
      import("./components/Navbar").then((m) => {
        // only resume if the home page finished its loading screen
        if (document.querySelector("main.main-active")) m.lenis?.start();
      });
    };
  }, []);

  return (
    <div className="page-layer" ref={ref} data-lenis-prevent>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
};

const AppRoutes = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  // Build the home page only when it is first needed, then keep it forever.
  const [homeMounted, setHomeMounted] = useState(isHome);
  useEffect(() => {
    if (isHome) setHomeMounted(true);
  }, [isHome]);

  return (
    <>
      {homeMounted && <Home />}
      <Routes>
        <Route path="/myworks" element={<PageLayer><MyWorks /></PageLayer>} />
        <Route path="/play" element={<PageLayer><Play /></PageLayer>} />
        <Route path="*" element={null} />
      </Routes>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;