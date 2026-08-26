import { ArrowUpRight, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";
import { asArray, getCategoryName, getProjectImage, getProjectSummary } from "../../lib/utils";
import type { Project } from "../../types/project";
import { LinkButton } from "../ui/Button";

export function ProjectCard({ project }: { project: Project }) {
  const technologies = asArray(project.technologies);
  const categoryName = getCategoryName(project.category);

  return (
    <article className="group overflow-hidden rounded-lg border border-white/10 bg-white/[.035] shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-violet-400/40">
      <Link to={`/projects/${project.slug}`} className="block h-48 overflow-hidden" aria-label={`View ${project.title}`}>
        <div className="h-full w-full transition duration-500 group-hover:scale-105" style={{ background: getProjectImage(project) }} />
      </Link>
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-md border border-violet-400/30 bg-violet-500/10 px-2.5 py-1 text-xs font-semibold text-violet-200">{categoryName}</span>
          <span className="text-xs text-slate-500">{project.year ?? "Recent"}</span>
        </div>
        <h2 className="text-xl font-bold text-white">{project.title}</h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{getProjectSummary(project)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.slice(0, 4).map((technology) => (
            <span key={technology.id} className="rounded-md border border-white/10 bg-slate-950/60 px-2 py-1 text-xs text-slate-300">{technology.name}</span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <LinkButton to={`/projects/${project.slug}`} className="flex-1" icon={<ArrowUpRight className="size-4" aria-hidden="true" />}>View Project</LinkButton>
          {project.github_url ? (
            <a href={project.github_url} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[.04] px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-violet-400/50" aria-label={`${project.title} GitHub repository`}>
              <GitBranch className="size-4" aria-hidden="true" />
              GitHub
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
