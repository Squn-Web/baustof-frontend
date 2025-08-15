import { useReducer, useMemo } from "react";
import type { GetProjectsQueryResult } from "../../../../sanity.types";
import type { ProjectsState, ProjectsActions } from "../context/ProjectsContext";

type ProjectsAction =
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_PROJECT_TYPE'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_DATE_FROM'; payload: string }
  | { type: 'SET_DATE_TO'; payload: string }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'RESET_FILTERS' }
  | { type: 'SYNC_FROM_URL'; payload: Partial<ProjectsState> };

interface FilterState {
  searchTerm: string;
  selectedProjectType: string;
  selectedCategory: string;
  dateFrom: string;
  dateTo: string;
  currentPage: number;
}

const getInitialFilterState = (): FilterState => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    searchTerm: urlParams.get("search") || "",
    selectedProjectType: urlParams.get("projectType") || "",
    selectedCategory: urlParams.get("category") || "",
    dateFrom: urlParams.get("dateFrom") || "",
    dateTo: urlParams.get("dateTo") || 
      new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Warsaw" }),
    currentPage: parseInt(urlParams.get("page") || "1"),
  };
};

const filterProjects = (projects: GetProjectsQueryResult, filters: FilterState): GetProjectsQueryResult => {
  return projects.filter((project) => {
    const matchesSearch =
      !filters.searchTerm.trim() ||
      project.title?.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesProjectType =
      !filters.selectedProjectType ||
      project.projectType?.slug.current === filters.selectedProjectType;

    const matchesCategory =
      !filters.selectedCategory ||
      project.categories?.some(
        (category) => category.slug.current === filters.selectedCategory,
      );

    let matchesDate = true;
    if (filters.dateFrom || filters.dateTo) {
      const projectDate = new Date(project.startDate);
      if (filters.dateFrom) {
        const fromDate = new Date(filters.dateFrom);
        matchesDate = matchesDate && projectDate >= fromDate;
      }
      if (filters.dateTo) {
        const toDate = new Date(filters.dateTo);
        toDate.setHours(23, 59, 59, 999);
        matchesDate = matchesDate && projectDate <= toDate;
      }
    }

    return matchesSearch && matchesProjectType && matchesCategory && matchesDate;
  });
};

const projectsReducer = (state: ProjectsState, action: ProjectsAction): ProjectsState => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload, currentPage: 1 };
    case 'SET_PROJECT_TYPE':
      return { ...state, selectedProjectType: action.payload, currentPage: 1 };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload, currentPage: 1 };
    case 'SET_DATE_FROM':
      return { ...state, dateFrom: action.payload, currentPage: 1 };
    case 'SET_DATE_TO':
      return { ...state, dateTo: action.payload, currentPage: 1 };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'RESET_FILTERS':
      return {
        ...state,
        searchTerm: "",
        selectedProjectType: "",
        selectedCategory: "",
        dateFrom: "",
        dateTo: new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Warsaw" }),
        currentPage: 1,
      };
    case 'SYNC_FROM_URL':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const useProjectsReducer = (projects: GetProjectsQueryResult) => {
  const initialFilters = getInitialFilterState();
  
  const initialState: ProjectsState = {
    ...initialFilters,
    filteredProjects: [],
    totalPages: 0,
    currentProjects: [],
  };

  const [state, dispatch] = useReducer(projectsReducer, initialState);

  const filteredProjects = useMemo(
    () => filterProjects(projects, state),
    [projects, state.searchTerm, state.selectedProjectType, state.selectedCategory, state.dateFrom, state.dateTo]
  );

  const projectsPerPage = 3;
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = state.currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const computedState: ProjectsState = {
    ...state,
    filteredProjects,
    totalPages,
    currentProjects,
  };

  const actions: ProjectsActions = {
    setSearchTerm: (value: string) => dispatch({ type: 'SET_SEARCH_TERM', payload: value }),
    setProjectType: (value: string) => dispatch({ type: 'SET_PROJECT_TYPE', payload: value }),
    setCategory: (value: string) => dispatch({ type: 'SET_CATEGORY', payload: value }),
    setDateFrom: (value: string) => dispatch({ type: 'SET_DATE_FROM', payload: value }),
    setDateTo: (value: string) => dispatch({ type: 'SET_DATE_TO', payload: value }),
    setPage: (page: number) => dispatch({ type: 'SET_PAGE', payload: page }),
    resetFilters: () => dispatch({ type: 'RESET_FILTERS' }),
  };

  return { state: computedState, actions, dispatch };
};