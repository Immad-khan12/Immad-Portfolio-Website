import { PropsWithChildren, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStackNew from "./TechStackNew";
import Certifications from "./Certifications";
import Skills from "./Skills";
import setSplitText from "./utils/splitText";
import FloatingWhatsApp from "./FloatingWhatsApp";
import "./styles/TallDesktop.css";

const MainContainer = ({ children }: PropsWithChildren) => {
  // Compact (phone + tablet, up to 768px): the 3D character sits inside the hero,
  // between the name and the roles. Desktop: it is a full-screen layer behind the page.
  const [compact, setCompact] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    let wasTall = false;
    const resizeHandler = () => {
      setSplitText();
      setCompact(window.innerWidth <= 768);

      // Phone in "desktop site" mode: wide but tall (portrait). The page keeps the
      // laptop layout, only the text is made a bit bigger (see TallDesktop.css).
      const isTall =
        window.innerWidth > 768 && window.innerHeight > window.innerWidth * 1.2;
      document.body.classList.toggle("tall-desktop", isTall);
      if (isTall !== wasTall) {
        wasTall = isTall;
        setTimeout(() => ScrollTrigger.refresh(), 100);
      }
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
      document.body.classList.remove("tall-desktop");
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      <FloatingWhatsApp />
      {!compact && children}
      <div className="container-main">
        <Landing compact={compact}>{children}</Landing>
        <About />
        <WhatIDo />
        <Career />
        <Work />
        <TechStackNew />
        <Skills />
        <Certifications />
        <Contact />
      </div>
    </div>
  );
};

export default MainContainer;