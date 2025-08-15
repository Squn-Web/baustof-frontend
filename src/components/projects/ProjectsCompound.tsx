import type { ReactNode } from "react";
import { ProjectsProvider } from "./context/ProjectsProvider";
import type { ProjectsData } from "./context/ProjectsContext";
import {
  ProjectsFilters,
  ProjectsSearch,
  ProjectsProjectTypeFilter,
  ProjectsCategoryFilter,
  ProjectsDateFilters,
  ProjectsResetButton,
} from "./compound/ProjectsFilters";
import {
  ProjectsResults,
  ProjectsList,
  ProjectsPagination,
} from "./compound/ProjectsResults";
import "./Projects.css";

interface ProjectsCompoundProps {
  children: ReactNode;
  data: ProjectsData;
}

const ProjectsCompound = ({ children, data }: ProjectsCompoundProps) => {
  return <ProjectsProvider data={data}>{children}</ProjectsProvider>;
};

ProjectsCompound.Filters = ProjectsFilters;
ProjectsCompound.Search = ProjectsSearch;
ProjectsCompound.ProjectTypeFilter = ProjectsProjectTypeFilter;
ProjectsCompound.CategoryFilter = ProjectsCategoryFilter;
ProjectsCompound.DateFilters = ProjectsDateFilters;
ProjectsCompound.ResetButton = ProjectsResetButton;
ProjectsCompound.Results = ProjectsResults;
ProjectsCompound.ProjectList = ProjectsList;
ProjectsCompound.Pagination = ProjectsPagination;

export default ProjectsCompound;
