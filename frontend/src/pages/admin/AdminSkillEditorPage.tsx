import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { AdminPageHeader } from "../../components/admin/AdminTable";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../components/ui/Toast";
import { useCreateSkill } from "../../features/skills/hooks";

const schema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  description: z.string().min(4),
  proficiency: z.string().min(1),
  icon: z.string().optional(),
  order_index: z.number().min(0),
});

type SkillForm = z.infer<typeof schema>;

export function AdminSkillEditorPage() {
  const create = useCreateSkill();
  const { notify } = useToast();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SkillForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      category: "Frontend",
      description: "",
      proficiency: "Advanced",
      icon: "code",
      order_index: 0,
    },
  });

  return (
    <section className="pb-20 lg:pb-0">
      <AdminPageHeader title="New Skill" description="Create a new skill entry for the portfolio catalog." />
      <form onSubmit={handleSubmit(async (values) => {
        await create.mutateAsync({
          name: values.name,
          category: values.category,
          description: values.description,
          proficiency: values.proficiency,
          icon: values.icon || "code",
          order_index: values.order_index,
        });
        notify("Skill saved.", "success");
        navigate("/admin/skills");
      })} className="grid gap-5 rounded-lg border border-white/10 bg-white/[.035] p-5 lg:grid-cols-2">
        <label>
          <span className="text-sm font-semibold text-slate-200">Skill name</span>
          <input className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm" {...register("name")} />
          {errors.name ? <span className="mt-1 block text-xs text-rose-300">Required</span> : null}
        </label>
        <label>
          <span className="text-sm font-semibold text-slate-200">Category</span>
          <input className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm" {...register("category")} />
          {errors.category ? <span className="mt-1 block text-xs text-rose-300">Required</span> : null}
        </label>
        <label>
          <span className="text-sm font-semibold text-slate-200">Proficiency</span>
          <select className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm" {...register("proficiency")}>
            <option value="Learning">Learning</option>
            <option value="Working">Working</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </label>
        <label>
          <span className="text-sm font-semibold text-slate-200">Order</span>
          <input type="number" className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm" {...register("order_index", { valueAsNumber: true })} />
        </label>
        <label>
          <span className="text-sm font-semibold text-slate-200">Icon key</span>
          <input className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm" {...register("icon")} />
        </label>
        <label className="lg:col-span-2">
          <span className="text-sm font-semibold text-slate-200">Description</span>
          <textarea className="mt-2 min-h-28 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-3 text-sm" {...register("description")} />
          {errors.description ? <span className="mt-1 block text-xs text-rose-300">Required</span> : null}
        </label>
        <Button className="lg:col-span-2" type="submit" disabled={isSubmitting} icon={<Save className="size-4" />}>{isSubmitting ? "Saving..." : "Save Skill"}</Button>
      </form>
    </section>
  );
}
