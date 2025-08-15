import type {
  GetProjectCategoryQueryResult,
  GetProjectsQueryResult,
  GetProjectTypeQueryResult,
} from "../../../sanity.types";
import ProjectsCompound from "./ProjectsCompound";

interface Props {
  filterTitle: string;
  sectionTitle: string;
  categories: GetProjectCategoryQueryResult;
  projectTypes: GetProjectTypeQueryResult;
  projects: GetProjectsQueryResult;
}

const Projects = ({
  filterTitle,
  projects,
  sectionTitle,
  categories,
  projectTypes,
}: Props) => {
  const data = {
    categories,
    projectTypes,
    projects,
    filterTitle,
    sectionTitle,
  };

  return (
    <ProjectsCompound data={data}>
      <ProjectsCompound.Filters title={filterTitle}>
        <ProjectsCompound.Search />
        <ProjectsCompound.CategoryFilter />
        <ProjectsCompound.ProjectTypeFilter />
        <ProjectsCompound.DateFilters />
        <ProjectsCompound.ResetButton />
      </ProjectsCompound.Filters>

      <ProjectsCompound.Results>
        <ProjectsCompound.ProjectList />
        <ProjectsCompound.Pagination />
      </ProjectsCompound.Results>
    </ProjectsCompound>
  );
};

export default Projects;
