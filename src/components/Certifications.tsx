import { config } from "../config";
import CallToAction from "./CallToAction";
import LoopVideo from "./LoopVideo";
import "./styles/Certifications.css";

const Certifications = () => (
  <div className="certs-section" id="certifications">
    <div className="certs-video-container">
      <LoopVideo className="certs-video" src="/video/video.webm" />
      <div className="certs-overlay" />
    </div>
    <div className="certs-content">
      <h2>
        Certifications <span>&amp; Training</span>
      </h2>
      <div className="certs-grid">
        {config.certifications.map((c) => (
          <div className="cert-card" key={c.title}>
            <div className="cert-ico">{c.icon}</div>
            <div className="cert-body">
              <h3>{c.title}</h3>
              <p>{c.issuer}</p>
              {c.id && <small>ID: {c.id}</small>}
            </div>
            <span className="cert-date">{c.date}</span>
          </div>
        ))}
      </div>
      <CallToAction />
    </div>
  </div>
);

export default Certifications;