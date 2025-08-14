import React from "react";
import type {
  GetProjectsQueryResult,
  internalGroqTypeReferenceTo,
  Project,
} from "../../../sanity.types";
import "./Project.css";
import { formatDate } from "../../lib/convertDate";
import { Image } from "astro:assets";
import { urlForImage } from "../../lib/urlForImage";
import { getImageDimensions } from "../../lib/getImageDimensions";

interface ProjectProps {
  project: GetProjectsQueryResult[number];
}

const ProjectComponent = ({ project }: ProjectProps) => {
  return (
    <div className="project-card">
      <img
        className="project-image"
        width={getImageDimensions(project.image).width}
        height={getImageDimensions(project.image).height}
        src={urlForImage(project.image.asset).url()}
        alt={project.image.alt}
      />

      <div className="project-content">
        <p className="project-title">{project.title}</p>

        <p className="project-type">{project.projectType?.slug.current}</p>

        <div className="categories-wrapper">
          {project.categories?.map((category, index) => (
            <p key={index} className="category-item">
              {category.slug.current}
            </p>
          ))}
        </div>

        <div className="project-meta">
          <div className="icon-wrapper">
            <img className="icon" src="/icons/calendar.svg" alt="Icon" />
            <p className="meta-item">{formatDate(project.startDate)}</p>
          </div>
          <div className="icon-wrapper">
            <img className="icon" src="/icons/location.svg" alt="Icon" />

            <p className="meta-item">{project.city}</p>
          </div>
        </div>

        <p className="project-description">{project.text}</p>

        <a className="project-link" href={project.actionButton.href}>
          <p>{project.actionButton.text}</p>
          <img className="icon" src="/icons/arrow_right.svg" alt="Icon" />
        </a>
      </div>
    </div>
  );
};

export default ProjectComponent;
