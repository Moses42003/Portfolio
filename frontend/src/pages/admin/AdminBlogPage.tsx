import { Edit, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { AdminPageHeader, AdminTable } from "../../components/admin/AdminTable";
import { LinkButton } from "../../components/ui/Button";
import { LoadingState } from "../../components/ui/States";
import { useToast } from "../../components/ui/Toast";
import { useAdminBlogPosts, useDeleteBlogPost } from "../../features/blog/hooks";
import { formatDate, getCategoryName } from "../../lib/utils";

export function AdminBlogPage() {
  const query = useAdminBlogPosts();
  const remove = useDeleteBlogPost();
  const { notify } = useToast();

  return (
    <section className="pb-20 lg:pb-0">
      <AdminPageHeader title="Blog Posts" description="Markdown-ready content management for articles, categories, tags, status, and publishing metadata." action={<LinkButton to="/admin/blog/new" icon={<Plus className="size-4" />}>New Post</LinkButton>} />
      {query.isLoading ? <LoadingState /> : <AdminTable headers={["Title", "Category", "Status", "Published", "Reading Time", "Actions"]}>{query.data?.map((post) => <tr key={post.id}><td className="px-4 py-4 font-semibold text-white">{post.title}</td><td className="px-4 py-4">{getCategoryName(post.category)}</td><td className="px-4 py-4 capitalize">{post.status ?? (post.published ? "published" : "draft")}</td><td className="px-4 py-4">{formatDate(post.published_at ?? post.created_at)}</td><td className="px-4 py-4">{post.reading_time ?? "—"} min</td><td className="px-4 py-4"><div className="flex gap-2"><Link to={`/admin/blog/${post.id}/edit`}><Edit className="size-4 text-cyan-200" /></Link><button aria-label="Delete post" onClick={async () => { if (window.confirm(`Delete ${post.title}?`)) { await remove.mutateAsync(String(post.id)); notify("Post deleted.", "success"); } }}><Trash2 className="size-4 text-rose-300" /></button></div></td></tr>)}</AdminTable>}
    </section>
  );
}
