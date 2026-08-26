import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { AdminPageHeader } from "../../components/admin/AdminTable";
import { Button } from "../../components/ui/Button";
import { LoadingState } from "../../components/ui/States";
import { useToast } from "../../components/ui/Toast";
import { useAdminProject, useCreateProject, useUpdateProject } from "../../features/projects/hooks";

const schema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  content: z.string().min(10),
  thumbnail: z.string().optional(),
  category_id: z.string().min(1),
  technology_ids: z.string().min(1),
  github_url: z.string().optional(),
  live_url: z.string().optional(),
  featured: z.boolean(),
  status: z.enum(["draft", "published", "archived"]),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});
type ProjectForm = z.infer<typeof schema>;

export function AdminProjectEditorPage() {
  const { id } = useParams();
  const isNew = !id;
  const project = useAdminProject(id);
  const create = useCreateProject();
  const update = useUpdateProject();
  const { notify } = useToast();
  const navigate = useNavigate();
  const projectRecord = project.data as any;
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProjectForm>({
    resolver: zodResolver(schema),
    values: projectRecord ? {
      title: projectRecord.title,
      slug: projectRecord.slug,
      description: projectRecord.description ?? projectRecord.summary ?? "",
      content: projectRecord.content ?? projectRecord.summary ?? "",
      thumbnail: projectRecord.thumbnail ?? projectRecord.image_url ?? "",
      category_id: typeof projectRecord.category === "string" ? projectRecord.category : projectRecord.category?.id ?? "general",
      technology_ids: Array.isArray(projectRecord.technologies) ? projectRecord.technologies.map((technology: any) => technology.id).join(",") : "",
      github_url: projectRecord.github_url ?? "",
      live_url: projectRecord.live_url ?? projectRecord.project_url ?? "",
      featured: projectRecord.featured,
      status: projectRecord.status,
      start_date: projectRecord.start_date ?? "",
      end_date: projectRecord.end_date ?? "",
    } : { title: "", slug: "", description: "", content: "", thumbnail: "", category_id: "general", technology_ids: "", github_url: "", live_url: "", featured: false, status: "draft", start_date: "", end_date: "" },
  });
  if (!isNew && project.isLoading) return <LoadingState />;
  return (
    <section className="pb-20 lg:pb-0">
      <AdminPageHeader title={isNew ? "New Project" : "Edit Project"} description="Project editor shaped for FastAPI create and update endpoints." />
      <form className="grid gap-5 rounded-lg border border-white/10 bg-white/[.035] p-5 lg:grid-cols-2" onSubmit={handleSubmit(async (values) => {
        const payload = {
          title: values.title,
          slug: values.slug,
          summary: values.description,
          description: values.description,
          image_url: values.thumbnail || null,
          project_url: values.live_url || null,
          github_url: values.github_url || null,
          featured: values.featured,
          status: values.status,
          order_index: 0,
          technology_ids: values.technology_ids.split(",").map((item) => Number(item.trim())).filter((item) => Number.isFinite(item) && item > 0),
        };
        if (isNew) await create.mutateAsync(payload); else await update.mutateAsync({ id: id ?? "", payload }); notify("Project saved.", "success"); navigate("/admin/projects"); })}>
        {["title", "slug", "thumbnail", "category_id", "technology_ids", "github_url", "live_url", "start_date", "end_date"].map((field) => <label key={field}><span className="text-sm font-semibold capitalize text-slate-200">{field.replaceAll("_", " ")}</span><input className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm outline-none focus:border-violet-400" {...register(field as keyof ProjectForm)} />{errors[field as keyof ProjectForm] ? <span className="text-xs text-rose-300">Required</span> : null}</label>)}
        <label><span className="text-sm font-semibold text-slate-200">Status</span><select className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm" {...register("status")}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
        <label className="flex items-center gap-3 pt-8"><input type="checkbox" {...register("featured")} /> <span className="text-sm font-semibold text-slate-200">Featured project</span></label>
        <label className="lg:col-span-2"><span className="text-sm font-semibold text-slate-200">Short description</span><textarea className="mt-2 min-h-24 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-3 text-sm" {...register("description")} /></label>
        <label className="lg:col-span-2"><span className="text-sm font-semibold text-slate-200">Full description</span><textarea className="mt-2 min-h-40 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-3 text-sm" {...register("content")} /></label>
        <Button className="lg:col-span-2" type="submit" disabled={isSubmitting} icon={<Save className="size-4" />}>Save Project</Button>
      </form>
    </section>
  );
}
