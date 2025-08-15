import { useEffect } from "react";
import type { Dispatch } from "react";

export const useBrowserHistory = (dispatch: Dispatch<any>) => {
  useEffect(() => {
    const getStateFromURL = () => {
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

    const handlePopState = () => {
      const newState = getStateFromURL();
      dispatch({ type: 'SYNC_FROM_URL', payload: newState });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [dispatch]);
};