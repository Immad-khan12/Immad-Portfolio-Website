import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

// ── Remember "loading screen already shown" + scroll position (per tab) ──
// So when you open "See All Works" / "Play" and come BACK, the home page opens
// directly where you left it, without the loading screen.
const LOADED_KEY = "portfolio-loaded";
const SCROLL_KEY = "portfolio-scroll";

const storage = {
  get(key: string): string | null {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
  remove(key: string) {
    try {
      sessionStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

// Run `cb` once the landing text exists (page chunk may still be mounting)
function whenLandingReady(cb: () => void, tries = 40) {
  if (document.querySelector(".landing-intro h1")) return cb();
  if (tries <= 0) return;
  setTimeout(() => whenLandingReady(cb, tries - 1), 100);
}

function restoreScroll(y: number, onDone: () => void) {
  if (y <= 0) return onDone();
  const go = async () => {
    const { lenis } = await import("../components/Navbar");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    ScrollTrigger.refresh();
    if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
  };
  // two tries: once layout is ready, and once more after pinned sections settle
  setTimeout(go, 60);
  setTimeout(go, 700);
  // start remembering the scroll position again only after restoring is finished
  setTimeout(onDone, 1000);
}

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const isDesktop = window.innerWidth > 1024;
  // true when we come BACK to the home page inside the same tab
  const [cameBack] = useState(() => storage.get(LOADED_KEY) === "1");
  // read the saved position right now, before any scroll event can overwrite it
  const [savedScroll] = useState(
    () => parseInt(storage.get(SCROLL_KEY) || "0", 10) || 0
  );
  const saveEnabled = useRef(!(cameBack && savedScroll > 0));

  const [isLoading, setIsLoadingState] = useState(() => {
    // Skip loading when the 3D character is not rendered (<= 1024px)
    // or when the loading screen was already shown in this tab.
    if (!isDesktop) return false;
    return !cameBack;
  });
  const [loading, setLoading] = useState(0);
  const started = useRef(false);

  const setIsLoading = (state: boolean) => {
    if (!state) storage.set(LOADED_KEY, "1");
    setIsLoadingState(state);
  };

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };

  useEffect(() => {
    // Mobile (no 3D model) or coming back from another page: no loading screen,
    // start the animations straight away and go back to the old scroll position.
    if (isLoading || started.current) return;
    started.current = true;
    storage.set(LOADED_KEY, "1");
    whenLandingReady(() => {
      import("../components/utils/initialFX").then((module) => {
        if (module.initialFX) module.initialFX();
        if (cameBack) {
          restoreScroll(savedScroll, () => {
            saveEnabled.current = true;
          });
        }
      });
    });
  }, []);

  useEffect(() => {
    // Remember where you are on the home page
    const onScroll = () => {
      if (
        saveEnabled.current &&
        window.location.pathname === "/" &&
        window.scrollY > 0
      ) {
        storage.set(SCROLL_KEY, String(Math.round(window.scrollY)));
      }
    };
    // A real page reload / tab close should show the loading screen again
    const onPageHide = () => {
      storage.remove(LOADED_KEY);
      storage.remove(SCROLL_KEY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", onPageHide);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, []);

  useEffect(() => {}, [loading]);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};