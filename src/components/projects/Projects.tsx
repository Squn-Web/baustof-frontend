import type { GetProjectsQueryResult } from "../../../sanity.types";
import ProjectComponent from "./Project.tsx";
import "./Projects.css";
// Pagination
import { Pagination } from "./Pagination";
import { useState, useMemo, useEffect } from "react";

interface Props {
  filterTitle: string;
  sectionTitle: string;
  projects: GetProjectsQueryResult;
}

const Projects = ({ filterTitle, projects, sectionTitle }: Props) => {
  return (
    <>
      <div className="filters-wrapper">
        <h3>{filterTitle}</h3>
        <div className="filters">
          {/* input searchbox */}

          <div className="filter-group">
            <label htmlFor="search">Szukaj</label>
            <input
              type="text"
              id="search"
              placeholder="Szukaj projektów..."
              className="filter-input"
            />
          </div>

          {/* selectbox house type */}

          <div className="filter-group">
            <label htmlFor="houseType">Rodzaj domu</label>
            <select id="houseType" className="filter-select">
              <option value="" disabled selected>
                Wybierz rodzaj domu
              </option>
              <option value="dom-jednorodzinny">Dom jednorodzinny</option>
              <option value="dom-wielorodzinny">Dom wielorodzinny</option>
              <option value="apartament">Apartament</option>
            </select>
          </div>

          {/* selectbox projects type */}

          <div className="filter-group">
            <label htmlFor="projectType">Rodzaj projektu</label>
            <select id="projectType" className="filter-select">
              <option value="" disabled selected>
                Wybierz rodzaj projektu
              </option>
              <option value="nowy-budunek">Nowy budynek</option>
              <option value="remont">Remont</option>
              <option value="rozbudowa">Rozbudowa</option>
            </select>
          </div>

          {/* input for date selection */}

          <div className="filter-group">
            <div className="date-inputs">
              <div className="date-input-group">
                <label htmlFor="dateFrom">Od</label>
                <input
                  type="date"
                  id="dateFrom"
                  className="filter-input date-input"
                />
              </div>
              <div className="date-input-group">
                <label htmlFor="dateTo">Do</label>

                <input
                  type="date"
                  id="dateTo"
                  className="filter-input date-input"
                />
              </div>
            </div>
          </div>

          {/* reset button */}

          <button type="button" className="reset-button">
            Resetuj Filtry
          </button>
        </div>
      </div>

      {/* Rendering projects */}

      <div className="projects-wrapper">
        <h3>{sectionTitle}</h3>

        {projects.map((project) => {
          return <ProjectComponent project={project} />;
        })}

        {/* Pagination */}

        {/* {totalPages > 1 && (
          <div className="pagination-container">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )} */}
      </div>
    </>
  );
};

export default Projects;
