import type { ReactNode } from "react";
import { ProjectsContext, type ProjectsData } from "./ProjectsContext";
import { useProjectsReducer } from "../hooks/useProjectsReducer";
import { useURLSync } from "../hooks/useURLSync";
import { useBrowserHistory } from "../hooks/useBrowserHistory";
import { useScrollToProjects } from "../hooks/useScrollToProjects";

interface ProjectsProviderProps {
  children: ReactNode;
  data: ProjectsData;
}

export const ProjectsProvider = ({ children, data }: ProjectsProviderProps) => {
  const { state, actions, dispatch } = useProjectsReducer(data.projects);
  const { scrollToProjects } = useScrollToProjects();

  useURLSync(state);
  useBrowserHistory(dispatch);

  // Override the setPage action to include scroll behavior
  const enhancedActions = {
    ...actions,
    setPage: (page: number) => {
      actions.setPage(page);
      setTimeout(() => scrollToProjects(), 100); // Small delay to ensure DOM update
    },
  };

  const contextValue = {
    state,
    actions: enhancedActions,
    data,
  };

  return (
    <ProjectsContext.Provider value={contextValue}>
      {children}
    </ProjectsContext.Provider>
  );
};
