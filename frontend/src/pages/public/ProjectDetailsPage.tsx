import { ExternalLink, GitBranch } from "lucide-react";
import { useParams } from "react-router-dom";
import { PageShell } from "../../components/layout/PageShell";
import { Seo } from "../../components/ui/Seo";
import { EmptyState, LoadingState } from "../../components/ui/States";
import { useProject } from "../../features/projects/hooks";
import { asArray, getCategoryName, getProjectImage, getProjectSummary } from "../../lib/utils";

export function ProjectDetailsPage() {
  const { slug } = useParams();
  const { data: project, isLoading } = useProject(slug);
  if (isLoading) return <PageShell title="Loading project"><LoadingState /></PageShell>;
  if (!project) return <PageShell title="Project not found"><EmptyState title="Project not found" /></PageShell>;

  const projectRecord = project as any;
  const technologies = asArray(project.technologies);
  const categoryName = getCategoryName(project.category);
  const description = projectRecord.description ?? projectRecord.summary ?? "";
  const content = projectRecord.content ?? description ?? "Project details will be added soon.";

  return (
    <>
      <Seo title={project.title} path={`/projects/${project.slug}`} description={description} />
      <PageShell eyebrow={categoryName} title={project.title} description={getProjectSummary(project)}>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <div className="h-[420px] rounded-lg border border-white/10" style={{ background: getProjectImage(project) }} />
          <aside className="rounded-lg border border-white/10 bg-white/[.035] p-6">
            <h2 className="text-xl font-bold text-white">Project Details</h2>
            <p className="mt-4 leading-8 text-slate-300">{content}</p>
            <div className="mt-5 flex flex-wrap gap-2">{technologies.map((technology) => <span key={technology.id} className="rounded-md border border-white/10 px-2 py-1 text-xs text-slate-300">{technology.name}</span>)}</div>
            <div className="mt-6 flex flex-wrap gap-3">
              {(project.live_url ?? project.project_url) ? <a href={project.live_url ?? project.project_url} className="inline-flex items-center gap-2 rounded-lg border border-violet-400/40 bg-violet-500/15 px-4 py-2 text-sm font-semibold text-white"><ExternalLink className="size-4" />Live Project</a> : null}
              {project.github_url ? <a href={project.github_url} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white"><GitBranch className="size-4" />GitHub</a> : null}
            </div>
          </aside>
        </div>
      </PageShell>
    </>
  );
}
