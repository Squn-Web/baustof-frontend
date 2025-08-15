import { createContext, useContext } from "react";
import type {
  GetProjectCategoryQueryResult,
  GetProjectsQueryResult,
  GetProjectTypeQueryResult,
} from "../../../../sanity.types";

export interface ProjectsState {
  searchTerm: string;
  selectedProjectType: string;
  selectedCategory: string;
  dateFrom: string;
  dateTo: string;
  currentPage: number;
  filteredProjects: GetProjectsQueryResult;
  totalPages: number;
  currentProjects: GetProjectsQueryResult;
}

export interface ProjectsActions {
  setSearchTerm: (value: string) => void;
  setProjectType: (value: string) => void;
  setCategory: (value: string) => void;
  setDateFrom: (value: string) => void;
  setDateTo: (value: string) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export interface ProjectsData {
  categories: GetProjectCategoryQueryResult;
  projectTypes: GetProjectTypeQueryResult;
  projects: GetProjectsQueryResult;
  filterTitle: string;
  sectionTitle: string;
}

export interface ProjectsContextType {
  state: ProjectsState;
  actions: ProjectsActions;
  data: ProjectsData;
}

export const ProjectsContext = createContext<ProjectsContextType | null>(null);

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};