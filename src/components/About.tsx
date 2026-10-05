import "./styles/About.css";
import { config } from "../config";
import HireButtons from "./HireButtons";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">{config.about.title}</h3>
        <p className="para">
          {config.about.description}
        </p>
        <HireButtons />
      </div>
    </div>
  );
};

export default About;
