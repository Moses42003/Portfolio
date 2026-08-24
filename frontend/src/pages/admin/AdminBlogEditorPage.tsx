import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AdminPageHeader } from "../../components/admin/AdminTable";
import { Button } from "../../components/ui/Button";

const schema = z.object({ title: z.string().min(2), slug: z.string().min(2), excerpt: z.string().min(10), content: z.string().min(10), cover_image: z.string().optional(), category_id: z.string().min(1), tags: z.string(), status: z.enum(["draft", "published", "archived"]), published_at: z.string(), reading_time: z.number().min(1) });
type BlogForm = z.infer<typeof schema>;

export function AdminBlogEditorPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<BlogForm>({ resolver: zodResolver(schema), defaultValues: { title: "", slug: "", excerpt: "", content: "## Draft\n\nStart writing markdown content here.", cover_image: "", category_id: "cat-api", tags: "React,FastAPI", status: "draft", published_at: new Date().toISOString().slice(0, 10), reading_time: 5 } });
  return (
    <section className="pb-20 lg:pb-0">
      <AdminPageHeader title="Blog Editor" description="Designed so a richer markdown editor can replace the textarea without changing route or API contracts." />
      <form onSubmit={handleSubmit(() => undefined)} className="grid gap-5 rounded-lg border border-white/10 bg-white/[.035] p-5 lg:grid-cols-2">
        {["title", "slug", "cover_image", "category_id", "tags", "published_at", "reading_time"].map((field) => <label key={field}><span className="text-sm font-semibold capitalize text-slate-200">{field.replaceAll("_", " ")}</span><input className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm" {...register(field as keyof BlogForm)} />{errors[field as keyof BlogForm] ? <span className="text-xs text-rose-300">Required</span> : null}</label>)}
        <label><span className="text-sm font-semibold text-slate-200">Status</span><select className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm" {...register("status")}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
        <label className="lg:col-span-2"><span className="text-sm font-semibold text-slate-200">Excerpt</span><textarea className="mt-2 min-h-24 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-3 text-sm" {...register("excerpt")} /></label>
        <label className="lg:col-span-2"><span className="text-sm font-semibold text-slate-200">Markdown Content</span><textarea className="mt-2 min-h-72 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-3 font-mono text-sm" {...register("content")} /></label>
        <Button className="lg:col-span-2" type="submit" icon={<Save className="size-4" />}>Save Post</Button>
      </form>
    </section>
  );
}
