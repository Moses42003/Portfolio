import { Link } from "react-router-dom";
import { Edit, PlusCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api/client";
import { MetricChart } from "../../components/charts/MetricChart";
import { LoadingState } from "../../components/ui/States";
import { formatDate, getCategoryName } from "../../lib/utils";

export function AdminDashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ["admin", "dashboard"], queryFn: api.admin.dashboard });
  if (isLoading || !data) return <LoadingState label="Loading dashboard" />;

  const metrics = Array.isArray((data as any).metrics)
    ? (data as any).metrics
    : [
        { label: "Profiles", total: Number((data as any).profile ?? 0), growth: "+0%", tone: "violet" },
        { label: "Projects", total: Number((data as any).projects ?? 0), growth: "+0%", tone: "blue" },
        { label: "Skills", total: Number((data as any).skills ?? 0), growth: "+0%", tone: "emerald" },
        { label: "Messages", total: Number((data as any).messages ?? 0), growth: "+0%", tone: "amber" },
      ];

  const analytics = Array.isArray((data as any).analytics)
    ? (data as any).analytics
    : [Number((data as any).profile ?? 0), Number((data as any).projects ?? 0), Number((data as any).messages ?? 0), Number((data as any).skills ?? 0), Number((data as any).experience ?? 0), Number((data as any).articles ?? 0)];

  const recentProjects = Array.isArray((data as any).recent_projects) ? (data as any).recent_projects : [];
  const activity = Array.isArray((data as any).activity) ? (data as any).activity : ["Dashboard ready for content updates."];

  return (
    <section className="space-y-6 pb-20 lg:pb-0">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">Overview</p>
        <h1 className="mt-2 text-3xl font-black text-white">Admin Dashboard</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric: any) => <div key={metric.label} className="rounded-lg border border-white/10 bg-white/[.035] p-5"><p className="text-sm text-slate-400">{metric.label}</p><p className="mt-2 text-3xl font-black text-white">{metric.total}</p><p className="mt-1 text-sm text-cyan-200">{metric.growth}</p></div>)}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-lg border border-white/10 bg-white/[.035] p-5">
          <h2 className="mb-4 text-xl font-bold text-white">Analytics</h2>
          <MetricChart values={analytics} />
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            {["Profiles", "Projects", "Messages", "Skills"].map((item) => <div key={item} className="rounded-md border border-white/10 p-3 text-slate-300">{item}</div>)}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[.035] p-5">
          <h2 className="mb-4 text-xl font-bold text-white">Quick Actions</h2>
          <div className="grid gap-3">
            {[
              ["/admin/projects/new", "Add New Project"],
              ["/admin/blog/new", "Write New Blog Post"],
              ["/admin/skills/new", "Add New Skill"],
              ["/admin/experience/new", "Add Experience"],
              ["/admin/categories", "Manage Categories"],
              ["/admin/technologies", "Manage Technologies"],
            ].map(([to, label]) => <Link key={label} to={to} className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-950/50 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-violet-400/40"><PlusCircle className="size-4" />{label}</Link>)}
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-white/10 bg-white/[.035] p-5">
        <h2 className="mb-4 text-xl font-bold text-white">Recent Projects</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-slate-500"><tr><th className="py-3">Project</th><th>Category</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody className="divide-y divide-white/10">{recentProjects.length ? recentProjects.map((project: any) => <tr key={project.id}><td className="py-4 font-semibold text-white">{project.title}</td><td>{getCategoryName(project.category)}</td><td className="capitalize">{project.status}</td><td>{project.updated_at ? formatDate(project.updated_at) : "—"}</td><td><Link to={`/admin/projects/${project.id}/edit`} aria-label={`Edit ${project.title}`}><Edit className="size-4 text-cyan-200" /></Link></td></tr>) : <tr><td colSpan={5} className="py-4 text-slate-400">No recent project activity yet.</td></tr>}</tbody>
          </table>
        </div>
      </div>
      <div className="rounded-lg border border-white/10 bg-white/[.035] p-5">
        <h2 className="mb-3 text-xl font-bold text-white">Recent Activity</h2>
        <div className="grid gap-2">{activity.map((item: string) => <p key={item} className="rounded-md border border-white/10 bg-slate-950/50 p-3 text-sm text-slate-300">{item}</p>)}</div>
      </div>
    </section>
  );
}
