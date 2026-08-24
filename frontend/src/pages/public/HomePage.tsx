import { ArrowDownToLine, ArrowUpRight, BriefcaseBusiness, GitBranch, Globe, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { DeveloperVisual } from "../../components/portfolio/DeveloperVisual";
import { ProjectCard } from "../../components/projects/ProjectCard";
import { Seo } from "../../components/ui/Seo";
import { EmptyState, ErrorState, LoadingState } from "../../components/ui/States";
import { LinkButton } from "../../components/ui/Button";
import { useFeaturedProjects } from "../../features/projects/hooks";
import { useProfile } from "../../features/profile/hooks";

export function HomePage() {
  const profileQuery = useProfile();
  const projectsQuery = useFeaturedProjects();
  const profile = profileQuery.data;

  return (
    <>
      <Seo path="/" />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="mb-5 inline-flex rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-sm font-semibold text-emerald-200">Available for work</p>
            <p className="text-2xl font-bold text-white">{profile?.greeting ?? "Hi, I'm Moses"} <span aria-hidden="true">👋</span></p>
            <h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">{profile?.headline ?? "I build digital experiences that make an impact."}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{profile?.summary ?? "Full-Stack Developer passionate about building modern, fast and scalable web applications."}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton to="/projects" icon={<ArrowUpRight className="size-4" aria-hidden="true" />}>View My Work</LinkButton>
              <a href={profile?.cv_url ?? "#"} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[.04] px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-violet-400/50">
                <ArrowDownToLine className="size-4" aria-hidden="true" /> Download CV
              </a>
            </div>
            <div className="mt-8 flex gap-3" aria-label="Social links">
              {[
                { href: profile?.socials.github, label: "GitHub", icon: GitBranch },
                { href: profile?.socials.linkedin, label: "LinkedIn", icon: BriefcaseBusiness },
                { href: profile?.socials.twitter, label: "Twitter/X", icon: Globe },
                { href: profile?.socials.email, label: "Email", icon: Mail },
              ].map((item) => {
                const Icon = item.icon;
                return <a key={item.label} href={item.href ?? "#"} className="grid size-11 place-items-center rounded-lg border border-white/10 bg-white/[.04] text-slate-300 transition hover:border-cyan-300/40 hover:text-white" aria-label={item.label}><Icon className="size-5" aria-hidden="true" /></a>;
              })}
            </div>
          </motion.div>
          <DeveloperVisual />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        {profileQuery.isLoading ? <LoadingState label="Loading profile stats" /> : profileQuery.isError ? <ErrorState message="Unable to load profile statistics." /> : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {profile?.stats.map((stat) => (
              <div key={stat.id} className="rounded-lg border border-white/10 bg-white/[.035] p-6 text-center">
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">Selected work</p>
            <h2 className="mt-2 text-3xl font-black text-white">Featured Projects</h2>
          </div>
          <LinkButton to="/projects" variant="secondary">View All Projects</LinkButton>
        </div>
        {projectsQuery.isLoading ? <LoadingState label="Loading featured projects" /> : projectsQuery.isError ? <ErrorState message="Unable to load featured projects." /> : projectsQuery.data?.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{projectsQuery.data.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        ) : <EmptyState title="No featured projects yet" />}
      </section>
    </>
  );
}
