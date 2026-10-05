import { PropsWithChildren } from "react";
import { MdOutlineWorkOutline } from "react-icons/md";
import "./styles/Landing.css";
import "./styles/Extras.css";
import "./styles/Fixes.css";
import "./styles/MobileCharacter.css";
import { config } from "../config";

// compact (phone + tablet, up to 1024px): the 3D character sits inside the hero,
// between the name and the roles. On desktop it is a full-screen layer instead.
type Props = PropsWithChildren<{ compact?: boolean }>;

const Landing = ({ children, compact = false }: Props) => {
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
          {compact && <div className="char-slot">{children}</div>}
          <div className="landing-info">
            <h3>{config.developer.rolePrefix}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{config.developer.roles[0]}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{config.developer.roles[1]}</div>
            </h2>
          </div>
          <div className="landing-cta">
            <a className="hire-btn hire-btn-hire" href={config.contact.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="disable">
              <MdOutlineWorkOutline /> Hire Me
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;