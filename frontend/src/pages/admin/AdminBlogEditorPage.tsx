import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { AdminPageHeader } from "../../components/admin/AdminTable";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../components/ui/Toast";
import { useCreateBlogPost, useUpdateBlogPost } from "../../features/blog/hooks";

const schema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.string().min(10),
  content: z.string().min(10),
  thumbnail_url: z.string().optional(),
  category_id: z.number().optional(),
  published: z.boolean(),
  featured: z.boolean(),
});
type BlogForm = z.infer<typeof schema>;

export function AdminBlogEditorPage() {
  const { id } = useParams();
  const isNew = !id;
  const create = useCreateBlogPost();
  const update = useUpdateBlogPost();
  const { notify } = useToast();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BlogForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "## Draft\n\nStart writing markdown content here.",
      thumbnail_url: "",
      category_id: undefined,
      published: true,
      featured: false,
    },
  });

  return (
    <section className="pb-20 lg:pb-0">
      <AdminPageHeader title="Blog Editor" description="Designed so a richer markdown editor can replace the textarea without changing route or API contracts." />
      <form onSubmit={handleSubmit(async (values) => {
        const payload = {
          title: values.title,
          slug: values.slug,
          excerpt: values.excerpt,
          content: values.content,
          thumbnail_url: values.thumbnail_url || null,
          category_id: values.category_id && values.category_id > 0 ? values.category_id : null,
          published: values.published,
          featured: values.featured,
        };

        if (isNew) {
          await create.mutateAsync(payload);
        } else {
          await update.mutateAsync({ id: id ?? "", payload });
        }
        notify("Post saved.", "success");
        navigate("/admin/blog");
      })} className="grid gap-5 rounded-lg border border-white/10 bg-white/[.035] p-5 lg:grid-cols-2">
        {[
          ["title", "text"],
          ["slug", "text"],
          ["thumbnail_url", "url"],
          ["category_id", "number"],
        ].map(([field, type]) => <label key={field}><span className="text-sm font-semibold capitalize text-slate-200">{field.replaceAll("_", " ")}</span><input type={type} className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm" {...register(field as keyof BlogForm, field === "category_id" ? { valueAsNumber: true } : {})} />{errors[field as keyof BlogForm] ? <span className="text-xs text-rose-300">Required</span> : null}</label>)}
        <label className="flex items-center gap-3 pt-8"><input type="checkbox" {...register("published")} /> <span className="text-sm font-semibold text-slate-200">Published</span></label>
        <label className="flex items-center gap-3 pt-8"><input type="checkbox" {...register("featured")} /> <span className="text-sm font-semibold text-slate-200">Featured post</span></label>
        <label className="lg:col-span-2"><span className="text-sm font-semibold text-slate-200">Excerpt</span><textarea className="mt-2 min-h-24 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-3 text-sm" {...register("excerpt")} /></label>
        <label className="lg:col-span-2"><span className="text-sm font-semibold text-slate-200">Markdown Content</span><textarea className="mt-2 min-h-72 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-3 font-mono text-sm" {...register("content")} /></label>
        <Button className="lg:col-span-2" type="submit" disabled={isSubmitting} icon={<Save className="size-4" />}>{isSubmitting ? "Saving..." : isNew ? "Save Post" : "Update Post"}</Button>
      </form>
    </section>
  );
}
