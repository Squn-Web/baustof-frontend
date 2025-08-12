import React from "react";
import type { Project } from "../../../sanity.types";
import "./Project.css";

interface ProjectProps {
  project: Project;
}

const ProjectComponent = ({ project }: ProjectProps) => {
  return (
    <div className="project-wrapper">
      <p>{project.title}</p>
      <p>{project.text}</p>
      <p>{project.startDate}</p>
      {/* <p>{project.categories}</p> */}
      <p>{project.city}</p>
      {/* <p>{project.image}</p> */}
      {/* <p>{project.projectType}</p> */}
      {/* <p>{project.seo}</p> */}
      {/* <p>{project.slug}</p> */}
      {/* <p>{project.actionButton}</p> */}
    </div>
  );
};

export default ProjectComponent;
