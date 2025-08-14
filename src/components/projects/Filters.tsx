import "./Filters.css";
import type {
  GetProjectCategoryQueryResult,
  GetProjectTypeQueryResult,
} from "../../../sanity.types";

interface FiltersProps {
  filterTitle: string;
  categories: GetProjectCategoryQueryResult;
  projectTypes: GetProjectTypeQueryResult;
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedProjectType: string;
  onProjectTypeChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  dateFrom: string;
  onDateFromChange: (value: string) => void;
  dateTo: string;
  onDateToChange: (value: string) => void;
  onResetFilters: () => void;
}

const Filters = ({
  filterTitle,
  categories,
  projectTypes,
  searchValue,
  onSearchChange,
  selectedProjectType,
  onProjectTypeChange,
  selectedCategory,
  onCategoryChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  onResetFilters,
}: FiltersProps) => {
  return (
    <div className="filters-wrapper">
      <h3>{filterTitle}</h3>
      <div className="filters">
        {/* input searchbox */}

        <div className="filter-group">
          <label htmlFor="search">Szukaj</label>
          <div className="search-input-wrapper">
            <input
              type="text"
              id="search"
              placeholder="Szukaj projektów..."
              className="filter-input"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchValue && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => onSearchChange("")}
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

        {/* selectbox house type */}

        <div className="filter-group">
          <label htmlFor="categories">Rodzaj domu</label>
          <select
            id="categories"
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">Wszystkie rodzaje domów</option>
            {categories.map((category) => {
              return (
                <option value={category.slug.current} key={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        {/* selectbox projects type */}

        <div className="filter-group">
          <label htmlFor="projectType">Rodzaj projektu</label>
          <select
            id="projectType"
            className="filter-select"
            value={selectedProjectType}
            onChange={(e) => onProjectTypeChange(e.target.value)}
          >
            <option value="">Wszystkie rodzaje projektów</option>
            {projectTypes.map((projectType) => {
              return (
                <option value={projectType.slug.current} key={projectType._id}>
                  {projectType.name}
                </option>
              );
            })}
          </select>
        </div>

        {/* inputs date selection */}

        <div className="filter-group">
          <div className="date-inputs">
            <div className="date-input-group">
              <label htmlFor="dateFrom">Od</label>
              <input
                type="date"
                id="dateFrom"
                className="filter-input date-input"
                value={dateFrom}
                onChange={(e) => onDateFromChange(e.target.value)}
              />
            </div>
            <div className="date-input-group">
              <label htmlFor="dateTo">Do</label>
              <input
                type="date"
                id="dateTo"
                className="filter-input date-input"
                value={dateTo}
                onChange={(e) => onDateToChange(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* reset button */}

        <button type="button" className="reset-button" onClick={onResetFilters}>
          Resetuj Filtry
        </button>
      </div>
    </div>
  );
};

export default Filters;
