import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineWorkOutline } from "react-icons/md";
import { hireLink, letsTalkLink } from "../config";
import "./styles/Extras.css";

interface Props {
  className?: string;
}

/** "Let's Talk" (WhatsApp) + "Hire Me" (email) buttons, reused in every section. */
const HireButtons = ({ className = "" }: Props) => (
  <div className={`hire-buttons ${className}`}>
    <a
      className="hire-btn hire-btn-talk"
      href={letsTalkLink}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="disable"
    >
      <FaWhatsapp /> Let&apos;s Talk
    </a>
    <a className="hire-btn hire-btn-hire" href={hireLink} target="_blank" rel="noopener noreferrer" data-cursor="disable">
      <MdOutlineWorkOutline /> Hire Me
    </a>
  </div>
);

export default HireButtons;
