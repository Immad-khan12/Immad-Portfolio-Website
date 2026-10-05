import "./styles/Work.css";
import "./styles/WorkCards.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    // Disable pinning on mobile to allow scrolling
    if (window.innerWidth <= 768) return;

    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Refresh ScrollTrigger after layout settles
    ScrollTrigger.refresh();

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {config.projects.slice(0, 5).map((project, index) => (
            <div className="work-box" key={project.id}>
              <div className="work-card">
                <div className="work-card-glow" />
                <div className="work-card-media">
                  <WorkImage
                    image={project.image}
                    alt={project.title}
                    link={project.live || project.github}
                  />
                  <span className="work-card-cat">{project.category}</span>
                  <span className="work-card-num">0{index + 1}</span>
                </div>
                <div className="work-card-body">
                  <h4 className="work-card-title">{project.title}</h4>
                  <p className="work-card-desc">{project.description}</p>
                  <div className="work-card-tags">
                    {project.technologies.split(",").map((t) => (
                      <span key={t}>{t.trim()}</span>
                    ))}
                  </div>
                  <div className="work-card-links">
                    {project.live && (
                      <a
                        className="work-card-btn work-card-btn-primary"
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="disable"
                      >
                        Live Demo <MdArrowOutward />
                      </a>
                    )}
                    <a
                      className="work-card-btn work-card-btn-ghost"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="disable"
                    >
                      <FaGithub /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* See All Works Button */}
          <div className="work-box work-box-cta">
            <div className="see-all-works">
              <h3>Want to see more?</h3>
              <p>Explore all of my projects and creations</p>
              <Link to="/myworks" className="see-all-btn" data-cursor="disable">
                See All Works →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;