import { PropsWithChildren } from "react";
import { MdOutlineWorkOutline } from "react-icons/md";
import "./styles/Landing.css";
import "./styles/Extras.css";
import "./styles/Fixes.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {config.developer.heroFirst.toUpperCase()}
              {" "}
              <br />
              <span>{config.developer.heroLast.toUpperCase()}</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>{config.developer.rolePrefix}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{config.developer.roles[0]}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{config.developer.roles[1]}</div>
            </h2>
          </div>
          {/* Mobile photo - shows only on mobile when 3D character is hidden */}
          <div className="mobile-photo">
            <img
              src="/images/profile.webp"
              alt={config.developer.fullName}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="landing-cta">
            <a className="hire-btn hire-btn-hire" href={config.contact.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="disable">
              <MdOutlineWorkOutline /> Hire Me
            </a>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;