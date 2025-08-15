import type { ReactNode } from "react";
import { useProjects } from "../context/ProjectsContext";
import ProjectComponent from "../Project.tsx";
import { Pagination } from "../Pagination";

interface ProjectsResultsProps {
  children: ReactNode;
}

export const ProjectsResults = ({ children }: ProjectsResultsProps) => {
  return (
    <div className="projects-wrapper">
      {children}
    </div>
  );
};

export const ProjectsList = () => {
  const { state } = useProjects();

  return (
    <>
      {state.currentProjects.map((project) => (
        <ProjectComponent project={project} key={project._id} />
      ))}
    </>
  );
};

export const ProjectsPagination = () => {
  const { state, actions } = useProjects();

  if (state.totalPages <= 1) return null;

  return (
    <div className="pagination-container">
      <Pagination
        currentPage={state.currentPage}
        totalPages={state.totalPages}
        onPageChange={actions.setPage}
      />
    </div>
  );
};
