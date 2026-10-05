import { useState } from "react";
import { config } from "../config";
import "./styles/Skills.css";

type View = "category" | "project";

const Skills = () => {
  const [view, setView] = useState<View>("category");
  const total = config.skillCategories.reduce((n, c) => n + c.items.length, 0);

  return (
    <div className="skills-section" id="skills">
      <div className="skills-inner">
        <h2>
          All <span>Skills</span>
        </h2>
        <p className="skills-sub">
          {total}+ skills across {config.skillCategories.length} areas, and exactly what I used in each project.
        </p>

        <div className="skills-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={view === "category"}
            className={view === "category" ? "on" : ""}
            onClick={() => setView("category")}
            data-cursor="disable"
          >
            By Category
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "project"}
            className={view === "project" ? "on" : ""}
            onClick={() => setView("project")}
            data-cursor="disable"
          >
            By Project
          </button>
        </div>

        {view === "category" ? (
          <div className="skills-grid">
            {config.skillCategories.map((cat) => (
              <div className="skill-card" key={cat.title} style={{ ["--sc" as string]: cat.color }}>
                <div className="skill-card-head">
                  <span className="skill-ico">{cat.icon}</span>
                  <h3>{cat.title}</h3>
                  <em>{cat.items.length}</em>
                </div>
                <div className="skill-chips">
                  {cat.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="skills-grid">
            {config.projects.map((p, i) => (
              <div className="skill-card" key={p.id} style={{ ["--sc" as string]: p.live ? "#22c55e" : "#8b5cf6" }}>
                <div className="skill-card-head">
                  <span className="skill-ico">0{i + 1}</span>
                  <h3>{p.title}</h3>
                  {p.live ? <em className="live">LIVE</em> : <em>CODE</em>}
                </div>
                <div className="skill-chips">
                  {p.skills.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="skill-links">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" data-cursor="disable">
                      Live Demo ↗
                    </a>
                  )}
                  <a href={p.github} target="_blank" rel="noopener noreferrer" data-cursor="disable">
                    GitHub ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
