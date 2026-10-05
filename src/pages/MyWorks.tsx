import { useEffect } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import HireButtons from "../components/HireButtons";
import ThemeToggle from "../components/ThemeToggle";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import "./MyWorks.css";

const MyWorks = () => {
  useEffect(() => {
    // The home page locks body scroll until loading finishes; this page must scroll.
    document.body.style.overflowY = "auto";
    const saved = document.documentElement.getAttribute("data-theme") === "light";
    document.body.style.backgroundColor = saved ? "#f6f3fa" : "#0b080c";
  }, []);

  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <div className="myworks-theme">
          <ThemeToggle />
        </div>
        <h1>
          All <span>Works</span>
        </h1>
        <p>A collection of my projects. Live demos and source code are linked on each card.</p>
        <HireButtons className="hire-buttons-center" />
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => (
          <div className="myworks-card" key={project.id}>
            <div className="myworks-card-number">0{index + 1}</div>
            <div className="myworks-card-image">
              <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
            </div>
            <div className="myworks-card-info">
              <h3>{project.title}</h3>
              <p className="myworks-card-category">{project.category}</p>
              <p className="myworks-card-description">{project.description}</p>
              <p className="myworks-card-tech">{project.technologies}</p>
              <div className="myworks-card-links">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" data-cursor="disable">
                    Live Demo ↗
                  </a>
                )}
                <a href={project.github} target="_blank" rel="noopener noreferrer" data-cursor="disable">
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <FloatingWhatsApp />
    </div>
  );
};

export default MyWorks;
