import { useEffect, useRef } from "react";

interface Props {
  src: string;
  className?: string;
}

/**
 * Background video that never stays stopped:
 * - restarts itself if the browser pauses / stalls / ends it
 * - plays only while visible (saves CPU) and resumes when you scroll back
 */
const LoopVideo = ({ src, className = "" }: Props) => {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    const play = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const onEnded = () => {
      video.currentTime = 0;
      play();
    };
    const onPause = () => {
      // browser paused it by itself while the section is on screen -> resume
      if (!document.hidden && visible) play();
    };

    let visible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        if (visible) play();
        else video.pause();
      },
      { threshold: 0.05 }
    );
    observer.observe(video);

    const onVisibility = () => {
      if (!document.hidden && visible) play();
    };

    video.addEventListener("ended", onEnded);
    video.addEventListener("pause", onPause);
    video.addEventListener("stalled", play);
    video.addEventListener("suspend", play);
    video.addEventListener("canplay", () => visible && play());
    document.addEventListener("visibilitychange", onVisibility);
    // fired by App.tsx when "My Works" / "Play" closes and the home page is shown again
    window.addEventListener("home-visible", onVisibility);

    return () => {
      window.removeEventListener("home-visible", onVisibility);
      observer.disconnect();
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("stalled", play);
      video.removeEventListener("suspend", play);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    />
  );
};

export default LoopVideo;