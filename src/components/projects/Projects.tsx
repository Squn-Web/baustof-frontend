import type { GetProjectCategoryQueryResult, GetProjectsQueryResult, GetProjectTypeQueryResult } from "../../../sanity.types";
import "./Projects.css";
import ProjectComponent from "./Project.tsx";
import { Pagination } from "./Pagination";
import { useState, useMemo, useEffect } from "react";
import Filters from "./Filters.tsx";

interface Props {
  filterTitle: string;
  sectionTitle: string;
  categories: GetProjectCategoryQueryResult;
  projectTypes: GetProjectTypeQueryResult;
  projects: GetProjectsQueryResult;
}

const Projects = ({ filterTitle, projects, sectionTitle, categories, projectTypes }: Props) => {
  // Get initial values from URL or use defaults
  const getInitialStateFromURL = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      searchTerm: urlParams.get("search") || "",
      selectedProjectType: urlParams.get("projectType") || "",
      selectedCategory: urlParams.get("category") || "",
      dateFrom: urlParams.get("dateFrom") || "",
      dateTo: urlParams.get("dateTo") || new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Warsaw" }),
      currentPage: parseInt(urlParams.get("page") || "1"),
    };
  };

  const initialState = getInitialStateFromURL();

  const [searchTerm, setSearchTerm] = useState(initialState.searchTerm);
  const [selectedProjectType, setSelectedProjectType] = useState(initialState.selectedProjectType);
  const [selectedCategory, setSelectedCategory] = useState(initialState.selectedCategory);
  const [dateFrom, setDateFrom] = useState(initialState.dateFrom);
  const [dateTo, setDateTo] = useState(initialState.dateTo);
  const [currentPage, setCurrentPage] = useState(initialState.currentPage);
  const projectsPerPage = 3;

  // Update URL when filters change
  const updateURL = (filters: any) => {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    const defaultDateTo = new Date().toLocaleDateString("en-CA", {
      timeZone: "Europe/Warsaw",
    });

    // Update or remove search parameters
    if (filters.searchTerm) searchParams.set("search", filters.searchTerm);
    else searchParams.delete("search");

    if (filters.selectedProjectType) searchParams.set("projectType", filters.selectedProjectType);
    else searchParams.delete("projectType");

    if (filters.selectedCategory) searchParams.set("category", filters.selectedCategory);
    else searchParams.delete("category");

    if (filters.dateFrom) searchParams.set("dateFrom", filters.dateFrom);
    else searchParams.delete("dateFrom");

    // Only include dateTo if it's different from default
    if (filters.dateTo && filters.dateTo !== defaultDateTo) searchParams.set("dateTo", filters.dateTo);
    else searchParams.delete("dateTo");

    if (filters.currentPage > 1) searchParams.set("page", filters.currentPage.toString());
    else searchParams.delete("page");

    // Update URL without page reload
    window.history.replaceState({}, "", url.toString());
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search term filter
      const matchesSearch = !searchTerm.trim() || project.title?.toLowerCase().includes(searchTerm.toLowerCase());

      // Project type filter
      const matchesProjectType = !selectedProjectType || project.projectType?.slug.current === selectedProjectType;

      // Category filter
      const matchesCategory = !selectedCategory || project.categories?.some((category) => category.slug.current === selectedCategory);

      // Date range filter
      let matchesDate = true;
      if (dateFrom || dateTo) {
        const projectDate = new Date(project.startDate);
        if (dateFrom) {
          const fromDate = new Date(dateFrom);
          matchesDate = matchesDate && projectDate >= fromDate;
        }
        if (dateTo) {
          const toDate = new Date(dateTo);
          toDate.setHours(23, 59, 59, 999); // Set to end of day
          matchesDate = matchesDate && projectDate <= toDate;
        }
      }

      return matchesSearch && matchesProjectType && matchesCategory && matchesDate;
    });
  }, [projects, searchTerm, selectedProjectType, selectedCategory, dateFrom, dateTo]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL({
      searchTerm,
      selectedProjectType,
      selectedCategory,
      dateFrom,
      dateTo,
      currentPage: page,
    });
  };

  // (removed) We now reset the page explicitly in each handler to keep URL in sync.

  // Handle browser back/forward navigation
  useEffect(() => {
    const el = document.getElementById("projects-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    const handlePopState = () => {
      const newState = getInitialStateFromURL();
      setSearchTerm(newState.searchTerm);
      setSelectedProjectType(newState.selectedProjectType);
      setSelectedCategory(newState.selectedCategory);
      setDateFrom(newState.dateFrom);
      setDateTo(newState.dateTo);
      setCurrentPage(newState.currentPage);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [currentPage]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    updateURL({
      searchTerm: value,
      selectedProjectType,
      selectedCategory,
      dateFrom,
      dateTo,
      currentPage: 1,
    });
  };

  const handleProjectTypeChange = (value: string) => {
    setSelectedProjectType(value);
    setCurrentPage(1);
    updateURL({
      searchTerm,
      selectedProjectType: value,
      selectedCategory,
      dateFrom,
      dateTo,
      currentPage: 1,
    });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
    updateURL({
      searchTerm,
      selectedProjectType,
      selectedCategory: value,
      dateFrom,
      dateTo,
      currentPage: 1,
    });
  };

  const handleDateFromChange = (value: string) => {
    setDateFrom(value);
    setCurrentPage(1);
    updateURL({
      searchTerm,
      selectedProjectType,
      selectedCategory,
      dateFrom: value,
      dateTo,
      currentPage: 1,
    });
  };

  const handleDateToChange = (value: string) => {
    setDateTo(value);
    setCurrentPage(1);
    updateURL({
      searchTerm,
      selectedProjectType,
      selectedCategory,
      dateFrom,
      dateTo: value,
      currentPage: 1,
    });
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedProjectType("");
    setSelectedCategory("");
    setDateFrom("");
    setDateTo(new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Warsaw" }));
    setCurrentPage(1);
    updateURL({
      searchTerm: "",
      selectedProjectType: "",
      selectedCategory: "",
      dateFrom: "",
      dateTo: new Date().toLocaleDateString("en-CA", {
        timeZone: "Europe/Warsaw",
      }),
      currentPage: 1,
    });
  };

  return (
    <>
      {/* Filters  */}

      <Filters
        filterTitle={filterTitle}
        categories={categories}
        projectTypes={projectTypes}
        searchValue={searchTerm}
        onSearchChange={handleSearchChange}
        selectedProjectType={selectedProjectType}
        onProjectTypeChange={handleProjectTypeChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        dateFrom={dateFrom}
        onDateFromChange={handleDateFromChange}
        dateTo={dateTo}
        onDateToChange={handleDateToChange}
        onResetFilters={handleResetFilters}
      />

      <div className="projects-wrapper">
        {/* Rendering projects */}
        {currentProjects.length === 0 ? (
          <div className="no-results">
            <img src="/no-result.png" width={380} height={380} alt="Brak wyników" />
            <p>Nie znaleziono podanych kryteriów wyszukiwania.</p>
          </div>
        ) : (
          currentProjects.map((project) => {
            return <ProjectComponent project={project} key={project._id} />;
          })
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-container">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </>
  );
};

export default Projects;
