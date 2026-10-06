import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { config, letsTalkLink } from "../config";
import gsap from "gsap";
import { useEffect } from "react";

const Contact = () => {
  // The contact block is ALWAYS visible (it used to start hidden and wait for a scroll
  // trigger, which never fired on some phones in "desktop site" mode, so the links
  // stayed invisible). Now it only gets a small fade-up when it comes on screen, and
  // if anything goes wrong it simply stays visible.
  useEffect(() => {
    const section = document.querySelector(".contact-section") as HTMLElement | null;
    if (!section) return;
    const items = section.querySelectorAll(".contact-container h3, .contact-box");
    let played = false;
    let tween: gsap.core.Tween | undefined;
    const play = () => {
      if (played) return;
      played = true;
      tween = gsap.from(items, {
        y: 40,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform",
      });
    };
    const check = () => {
      if (section.getBoundingClientRect().top < window.innerHeight * 0.95) play();
    };
    window.addEventListener("scroll", check, { passive: true });
    const poll = window.setInterval(check, 500);
    return () => {
      window.removeEventListener("scroll", check);
      window.clearInterval(poll);
      tween?.kill();
    };
  }, []);

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>{config.developer.fullName}</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href={`mailto:${config.contact.email}`} data-cursor="disable">
                {config.contact.email}
              </a>
            </p>
            <h4>WhatsApp</h4>
            <p>
              <a href={letsTalkLink} target="_blank" rel="noopener noreferrer" data-cursor="disable">
                {config.whatsapp.display}
              </a>
            </p>
            <h4>Location</h4>
            <p>
              <span>{config.social.location}</span>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href={config.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href={config.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href={config.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
            <a
              href={letsTalkLink}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              WhatsApp <MdArrowOutward />
            </a>
            <a
              href={config.resume.file}
              download={config.resume.downloadName}
              data-cursor="disable"
              className="contact-social"
            >
              Resume <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>{config.developer.fullName}</span>
            </h2>
            <h5>
              <MdCopyright /> {new Date().getFullYear()}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;