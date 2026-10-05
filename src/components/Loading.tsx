import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import { config } from "../config";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (percent >= 100) {
      const t1 = setTimeout(() => {
        setLoaded(true);
        setTimeout(() => {
          setIsLoaded(true);
        }, 450);
      }, 200);
      return () => clearTimeout(t1);
    }
  }, [percent >= 100]);

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 600);
      }
    });
  }, [isLoaded]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          {config.developer.name}{config.developer.heroLast}
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span>&nbsp; {config.developer.rolePrefix} {config.developer.roles[0]} &nbsp;</span> <span>&nbsp; {config.developer.rolePrefix} {config.developer.roles[1]} &nbsp;</span>
            <span>&nbsp; {config.developer.rolePrefix} {config.developer.roles[0]} &nbsp;</span> <span>&nbsp; {config.developer.rolePrefix} {config.developer.roles[1]} &nbsp;</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;
  let done = false;

  // 0 -> 90% in about 1 second, then wait for the 3D model to be ready
  let interval = setInterval(() => {
    percent = Math.min(percent + 2 + Math.round(Math.random() * 2), 90);
    setLoading(percent);
    if (percent >= 90) clearInterval(interval);
  }, 35);

  // Safety: if the model never loads, open the site anyway after 8 seconds
  const failSafe = setTimeout(() => {
    if (!done) clear();
  }, 8000);

  function clear() {
    done = true;
    clearTimeout(failSafe);
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      done = true;
      clearTimeout(failSafe);
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent = Math.min(percent + 3, 100);
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 10);
    });
  }
  return { loaded, percent, clear };
};