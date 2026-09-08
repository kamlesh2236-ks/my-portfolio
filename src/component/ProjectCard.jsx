import { useRef } from "react";
import { IconExternalLink } from "@tabler/icons-react";
import { useTheme } from "../context/theme.context";

const ProjectCard = ({ project, reverse }) => {
  const { theme, toggleTheme } = useTheme();
  const imageRef = useRef(null);
  return (
    <article className={`project-card ${reverse ? "reverse" : ""}`}>
      {/* =========================
          PROJECT VISUAL
      ========================== */}

      <div className="project-visual">
        <div className="project-stage">
          {/* Tablet */}
          
          <div className="tab-skills">
            <img
              src={project.image}
              className="content-img"
              alt={`${project.title} website`}
            />

            <img
              src={project.tabFrame}
              className="tab-frame"
              alt={`${project.title} tablet`}
            />

            {/* Hover Link */}

            <a href={project.link} target="_blank" className="hover-link">
              <span>
                {project.title}

                <IconExternalLink stroke={2} size={18} />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================= PROJECT CONTENT ========================== */}

      <div className="pr-text">
        <h1
          style={
            project.titleColor?.includes("gradient")
              ? {
                background: project.titleColor,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }
              : {
                color: project.titleColor,
              }
          }
        >
          {project.title}
        </h1>

        <p className="sub-title" style={
          project.titleColor?.includes("gradient")
            ? {
              background: project.titleColor,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }
            : {
              color: project.titleColor,
            }
        } >{project.subtitle}</p>

        <p className="description">{project.description}</p>

        {/* Technologies */}

        <div className="tag">
          {project.technologies.map((tech, index) => (
            <span key={index}>{tech}</span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
