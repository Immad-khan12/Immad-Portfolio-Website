import { FaWhatsapp } from "react-icons/fa6";
import { letsTalkLink } from "../config";
import "./styles/Extras.css";

/** Round WhatsApp button that stays visible in every section. */
const FloatingWhatsApp = () => (
  <a
    className="whatsapp-float"
    href={letsTalkLink}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    data-cursor="disable"
  >
    <FaWhatsapp />
    <span>Chat on WhatsApp</span>
  </a>
);

export default FloatingWhatsApp;
