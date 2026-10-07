import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Everything created below is remembered, so it can be cleaned up when the
// 3D character is removed (e.g. when you open another page) or rebuilt.
let charInterval: ReturnType<typeof setInterval> | undefined;
let createdTimelines: gsap.core.Timeline[] = [];
let createdTriggers: ScrollTrigger[] = [];

const track = (tl: gsap.core.Timeline) => {
  createdTimelines.push(tl);
  return tl;
};

export function killCharTimelines() {
  if (charInterval !== undefined) {
    clearInterval(charInterval);
    charInterval = undefined;
  }
  createdTimelines.forEach((tl) => {
    tl.scrollTrigger?.kill();
    tl.kill();
  });
  createdTimelines = [];
  createdTriggers.forEach((st) => st.kill());
  createdTriggers = [];
}

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  killCharTimelines();
  let intensity: number = 0;
  charInterval = setInterval(() => {
    intensity = Math.random();
  }, 200);
  const tl1 = track(gsap.timeline({
    scrollTrigger: {
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  }));
  const tl2 = track(gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  }));
  const tl3 = track(gsap.timeline({
    scrollTrigger: {
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  }));
  let screenLight: any, monitor: any;
  character?.children.forEach((object: any) => {
    if (object.name === "Plane004") {
      object.children.forEach((child: any) => {
        child.material.transparent = true;
        child.material.opacity = 0;
        if (child.material.name === "Material.027") {
          monitor = child;
          child.material.color.set("#FFFFFF");
        }
      });
    }
    if (object.name === "screenlight") {
      object.material.transparent = true;
      object.material.opacity = 0;
      object.material.emissive.set("#C8BFFF");
      track(gsap.timeline({ repeat: -1, repeatRefresh: true })).to(
        object.material,
        {
          emissiveIntensity: () => intensity * 8,
          duration: () => Math.random() * 0.6,
          delay: () => Math.random() * 0.1,
        }
      );
      screenLight = object;
    }
  });
  let neckBone = character?.getObjectByName("spine005");
  if (window.innerWidth > 768) {
    if (character) {
      // Phone in "desktop site" mode (tall screen, see TallDesktop.css): the camera
      // steps back more and the character sits further left, so the character and the
      // two "What I do" boxes stay side by side and never climb on each other.
      // On a laptop nothing changes.
      const tall = document.body.classList.contains("tall-desktop");
      const farK = tall ? 1.6 : 1;

      tl1
        .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
        .to(camera.position, { z: 22 }, 0)
        .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
        .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
        .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
        .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

      tl2
        .to(
          camera.position,
          { z: 75 * farK, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
          0
        )
        .to(".about-section", { y: "30%", duration: 6 }, 0)
        .to(".about-section", { opacity: 0, delay: 3, duration: 2 }, 0)
        .fromTo(
          ".character-model",
          { pointerEvents: "inherit" },
          { pointerEvents: "none", x: tall ? "-24%" : "-12%", delay: 2, duration: 5 },
          0
        )
        .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0)
        .to(neckBone!.rotation, { x: 0.6, delay: 2, duration: 3 }, 0)
        .to(monitor.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
        .to(screenLight.material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0)
        .fromTo(
          ".what-box-in",
          { display: "none" },
          { display: "flex", duration: 0.1, delay: 6 },
          0
        )
        .fromTo(
          monitor.position,
          { y: -10, z: 2 },
          { y: 0, z: 0, delay: 1.5, duration: 3 },
          0
        )
        .fromTo(
          ".character-rim",
          { opacity: 1, scaleX: 1.4 },
          { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
          0.3
        );

      tl3
        .fromTo(
          ".character-model",
          { y: "0%" },
          { y: "-100%", duration: 4, ease: "none", delay: 1 },
          0
        )
        .fromTo(".whatIDO", { y: 0 }, { y: "15%", duration: 2 }, 0)
        .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);

      // Exit tied to the "My career" section (not to the height of "What I do"),
      // so on tall/narrow screens (phone in desktop mode) the character is always
      // gone by the time the career heading shows up, just like on a laptop.
      const tlExit = track(
        gsap.timeline({
          scrollTrigger: {
            trigger: ".career-section",
            // tall phone screen: it fades out a little later, so it stays with the
            // "What I do" boxes, but is gone before the career heading shows up
            start: tall ? "top 94%" : "top bottom",
            end: tall ? "top 80%" : "top 45%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      );
      tlExit.fromTo(
        ".character-model",
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: 1, ease: "none" },
        0
      );
    }
  } else {
    if (character) {
      const tM2 = track(
        gsap.timeline({
          scrollTrigger: {
            trigger: ".what-box-in",
            start: "top 70%",
            end: "bottom top",
          },
        })
      );
      tM2.to(".what-box-in", { display: "flex", duration: 0.1, delay: 0 }, 0);

      // ───────── Phone: the character comes down the page like on desktop ─────────
      // The character box is pinned under the top bar from the hero until the end of
      // "What I do". On the way it turns, steps back and sits at its desk with the
      // monitor (same scene as desktop), then scrolls away.
      if (document.querySelector(".char-slot")) {
        const FAR_Z = 92; // how far the camera steps back (bigger = more of the desk, smaller character)
        const FAR_Y = 8.4;

        createdTriggers.push(
          ScrollTrigger.create({
            trigger: ".char-slot",
            start: "top 56px",
            endTrigger: ".whatIDO",
            end: "bottom 70%",
            pin: ".char-slot .character-container",
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // while following the page, a solid strip hides text behind the top bar
            toggleClass: {
              targets: ".char-slot .character-container",
              className: "is-pinned",
            },
          })
        );

        // hero -> About me: turn a little and come closer
        const mAbout = track(
          gsap.timeline({
            scrollTrigger: {
              trigger: ".about-section",
              start: "top 85%",
              end: "center 40%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
        );
        mAbout
          .fromTo(character.rotation, { y: 0 }, { y: 0.5, duration: 1 }, 0)
          .to(camera.position, { z: 22, duration: 1 }, 0);

        // About me -> What I do: step back, sit at the desk, monitor turns on
        const mWhat = track(
          gsap.timeline({
            scrollTrigger: {
              trigger: ".about-section",
              start: "center 40%",
              endTrigger: ".whatIDO",
              end: "top 30%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
        );
        mWhat
          .to(camera.position, { z: FAR_Z, y: FAR_Y, duration: 6, ease: "power2.inOut" }, 0)
          .to(character.rotation, { y: 0.92, x: 0.12, duration: 4, delay: 1 }, 0)
          .to(neckBone!.rotation, { x: 0.6, duration: 3, delay: 1 }, 0)
          .to(monitor.material, { opacity: 1, duration: 1, delay: 3 }, 0)
          .to(screenLight.material, { opacity: 1, duration: 1, delay: 4 }, 0)
          .fromTo(monitor.position, { y: -10, z: 2 }, { y: 0, z: 0, duration: 3, delay: 1.5 }, 0)
          .fromTo(
            ".character-rim",
            { opacity: 1, scaleX: 1.4 },
            { opacity: 0, scale: 0, y: "-70%", duration: 4, delay: 1 },
            0.3
          );
      }
    }
  }
}

export function setAllTimeline() {
  const careerTimeline = track(
    gsap.timeline({
      scrollTrigger: {
        trigger: ".career-section",
        start: "top 50%",
        end: "bottom 30%",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    })
  );
  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "0%" },
      { maxHeight: "100%", duration: 1, ease: "none" },
      0
    )

    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.2 },
      0
    )
    .fromTo(
      ".career-info-box",
      { opacity: 0 },
      { opacity: 1, stagger: 0.1, duration: 0.5 },
      0
    )
    .fromTo(
      ".career-dot",
      { animationIterationCount: "infinite" },
      {
        animationIterationCount: "1",
        delay: 0.3,
        duration: 0.1,
      },
      0
    );

  if (window.innerWidth > 768) {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: "20%", duration: 0.5, delay: 0.2 },
      0
    );
  } else {
    careerTimeline.fromTo(
      ".career-section",
      { y: 0 },
      { y: 0, duration: 0.5, delay: 0.2 },
      0
    );
  }
}