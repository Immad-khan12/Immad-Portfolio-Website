import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa6";
import { hireLink, letsTalkLink } from "../config";
import "./styles/CallToAction.css";

const CallToAction = () => {
  return (
    <div className="cta-section">
      <div className="cta-buttons">
        <Link to="/play" className="cta-btn cta-btn-play" data-cursor="disable">
          Play With Me →
        </Link>
        <a
          href={letsTalkLink}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn cta-btn-wa"
          data-cursor="disable"
        >
          <FaWhatsapp style={{ verticalAlign: "-2px" }} /> Let&apos;s Talk on WhatsApp →
        </a>
        <a
          href={hireLink}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn cta-btn-hire"
          data-cursor="disable"
        >
          Hire Me →
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
