import type { ReactNode } from "react";
import { useProjects } from "../context/ProjectsContext";
import "../ProjectsFilters.css";

interface ProjectsFiltersProps {
  children: ReactNode;
  title?: string;
}

export const ProjectsFilters = ({ children, title }: ProjectsFiltersProps) => {
  return (
    <div className="filters-wrapper">
      {title && <h3>{title}</h3>}
      <div className="filters">{children}</div>
    </div>
  );
};

export const ProjectsSearch = () => {
  const { state, actions } = useProjects();

  return (
    <div className="filter-group">
      <label htmlFor="search">Szukaj</label>
      <div className="search-input-wrapper">
        <input
          type="search"
          id="search"
          placeholder="Szukaj projektów..."
          className="filter-input"
          value={state.searchTerm}
          onChange={(e) => actions.setSearchTerm(e.target.value)}
          enterKeyHint="search"
        />
        {state.searchTerm && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => actions.setSearchTerm("")}
            aria-label="Clear search"
          >
            <img
              src="/icons/clear.svg"
              width="32"
              height="32"
              alt=""
              style={{ filter: "brightness(0) saturate(100%)" }}
              aria-hidden="true"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export const ProjectsProjectTypeFilter = () => {
  const { state, actions, data } = useProjects();

  return (
    <div className="filter-group">
      <label htmlFor="projectType">Rodzaj projektu</label>
      <select
        id="projectType"
        className="filter-select"
        value={state.selectedProjectType}
        onChange={(e) => actions.setProjectType(e.target.value)}
      >
        <option value="">Wszystkie rodzaje projektów</option>
        {data.projectTypes.map((projectType) => (
          <option key={projectType._id} value={projectType.slug.current}>
            {projectType.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const ProjectsCategoryFilter = () => {
  const { state, actions, data } = useProjects();

  return (
    <div className="filter-group">
      <label htmlFor="categories">Rodzaj domu</label>
      <select
        id="categories"
        className="filter-select"
        value={state.selectedCategory}
        onChange={(e) => actions.setCategory(e.target.value)}
      >
        <option value="">Wszystkie rodzaje domów</option>
        {data.categories.map((category) => (
          <option key={category._id} value={category.slug.current}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const ProjectsDateFilters = () => {
  const { state, actions } = useProjects();

  return (
    <div className="filter-group">
      <div className="date-inputs">
        <div className="date-input-group">
          <label htmlFor="dateFrom">Od</label>
          <input
            type="date"
            id="dateFrom"
            className="filter-input date-input"
            value={state.dateFrom}
            onChange={(e) => actions.setDateFrom(e.target.value)}
            max={state.dateTo || undefined}
          />
        </div>
        <div className="date-input-group">
          <label htmlFor="dateTo">Do</label>
          <input
            type="date"
            id="dateTo"
            className="filter-input date-input"
            value={state.dateTo}
            onChange={(e) => actions.setDateTo(e.target.value)}
            min={state.dateFrom || undefined}
          />
        </div>
      </div>
    </div>
  );
};

export const ProjectsResetButton = () => {
  const { actions } = useProjects();

  return (
    <button
      type="button"
      className="reset-button"
      onClick={actions.resetFilters}
    >
      Resetuj Filtry
    </button>
  );
};
