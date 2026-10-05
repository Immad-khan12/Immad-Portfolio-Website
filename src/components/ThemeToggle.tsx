import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

type Theme = "dark" | "light";

const getInitialTheme = (): Theme => {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* localStorage unavailable */
  }
  return "dark";
};

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#f6f3fa" : "#0b080c");
  // body background was set inline by GSAP after loading; keep it in sync
  document.body.style.backgroundColor = theme === "light" ? "#f6f3fa" : "#0b080c";
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      data-cursor="disable"
    >
      {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
    </button>
  );
};

export default ThemeToggle;
