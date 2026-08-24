import { PageShell } from "../../components/layout/PageShell";
import { ProjectCard } from "../../components/projects/ProjectCard";
import { Seo } from "../../components/ui/Seo";
import { EmptyState, ErrorState, LoadingState } from "../../components/ui/States";
import { useProjects } from "../../features/projects/hooks";

export function ProjectsPage() {
  const query = useProjects();
  return (
    <>
      <Seo title="Projects" path="/projects" />
      <PageShell eyebrow="Projects" title="Projects built with product polish and system thinking." description="Selected web applications, dashboards, APIs, and developer-focused experiences.">
        {query.isLoading ? <LoadingState label="Loading projects" /> : query.isError ? <ErrorState message="Unable to load projects." /> : query.data?.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{query.data.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        ) : <EmptyState title="No projects yet" />}
      </PageShell>
    </>
  );
}
