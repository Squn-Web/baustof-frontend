import { useEffect } from "react";
import type { ProjectsState } from "../context/ProjectsContext";

export const useURLSync = (state: ProjectsState) => {
  const updateURL = (filters: ProjectsState) => {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    const defaultDateTo = new Date().toLocaleDateString("en-CA", {
      timeZone: "Europe/Warsaw",
    });

    if (filters.searchTerm) searchParams.set("search", filters.searchTerm);
    else searchParams.delete("search");

    if (filters.selectedProjectType)
      searchParams.set("projectType", filters.selectedProjectType);
    else searchParams.delete("projectType");

    if (filters.selectedCategory)
      searchParams.set("category", filters.selectedCategory);
    else searchParams.delete("category");

    if (filters.dateFrom) searchParams.set("dateFrom", filters.dateFrom);
    else searchParams.delete("dateFrom");

    if (filters.dateTo && filters.dateTo !== defaultDateTo)
      searchParams.set("dateTo", filters.dateTo);
    else searchParams.delete("dateTo");

    if (filters.currentPage > 1)
      searchParams.set("page", filters.currentPage.toString());
    else searchParams.delete("page");

    window.history.replaceState({}, "", url.toString());
  };

  useEffect(() => {
    updateURL(state);
  }, [
    state.searchTerm,
    state.selectedProjectType,
    state.selectedCategory,
    state.dateFrom,
    state.dateTo,
    state.currentPage,
  ]);

  return { updateURL };
};