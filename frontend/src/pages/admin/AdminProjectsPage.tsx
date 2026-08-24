import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { AdminPageHeader, AdminTable } from "../../components/admin/AdminTable";
import { Button, LinkButton } from "../../components/ui/Button";
import { LoadingState } from "../../components/ui/States";
import { useToast } from "../../components/ui/Toast";
import { useAdminProjects, useDeleteProject } from "../../features/projects/hooks";
import { formatDate } from "../../lib/utils";

export function AdminProjectsPage() {
  const query = useAdminProjects();
  const remove = useDeleteProject();
  const { notify } = useToast();
  return (
    <section className="pb-20 lg:pb-0">
      <AdminPageHeader title="Projects" description="Manage portfolio work, statuses, featured visibility, links, and technologies." action={<LinkButton to="/admin/projects/new" icon={<Plus className="size-4" />}>New Project</LinkButton>} />
      {query.isLoading ? <LoadingState /> : (
        <AdminTable headers={["Thumbnail", "Title", "Category", "Status", "Featured", "Updated", "Actions"]}>
          {query.data?.map((project) => (
            <tr key={project.id}>
              <td className="px-4 py-4"><div className="size-12 rounded-md" style={{ background: project.thumbnail }} /></td>
              <td className="px-4 py-4 font-semibold text-white">{project.title}</td>
              <td className="px-4 py-4">{project.category.name}</td>
              <td className="px-4 py-4 capitalize">{project.status}</td>
              <td className="px-4 py-4">{project.featured ? "Yes" : "No"}</td>
              <td className="px-4 py-4">{formatDate(project.updated_at)}</td>
              <td className="px-4 py-4"><div className="flex gap-2"><Link to={`/projects/${project.slug}`} aria-label="View project"><Eye className="size-4" /></Link><Link to={`/admin/projects/${project.id}/edit`} aria-label="Edit project"><Edit className="size-4 text-cyan-200" /></Link><Button variant="ghost" className="min-h-0 p-0 text-rose-300" aria-label="Delete project" onClick={async () => { if (window.confirm(`Delete ${project.title}?`)) { await remove.mutateAsync(project.id); notify("Project deleted.", "success"); } }}><Trash2 className="size-4" /></Button></div></td>
            </tr>
          ))}
        </AdminTable>
      )}
    </section>
  );
}
