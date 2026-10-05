import { PropsWithChildren, useEffect, useState } from "react";
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

const MainContainer = ({ children }: PropsWithChildren) => {
  // Compact (phone + tablet, up to 1024px): the 3D character sits inside the hero,
  // between the name and the roles. Desktop: it is a full-screen layer behind the page.
  const [compact, setCompact] = useState<boolean>(window.innerWidth <= 1024);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setCompact(window.innerWidth <= 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
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