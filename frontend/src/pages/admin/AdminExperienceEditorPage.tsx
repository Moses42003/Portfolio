import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { AdminPageHeader } from "../../components/admin/AdminTable";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../components/ui/Toast";
import { useCreateExperience } from "../../features/experience/hooks";

const schema = z.object({
  company: z.string().min(2),
  role: z.string().min(2),
  location: z.string().min(2),
  start_date: z.string().min(1),
  end_date: z.string().optional(),
  description: z.string().min(10),
  current: z.boolean(),
  order_index: z.number().min(0),
});

type ExperienceForm = z.infer<typeof schema>;

export function AdminExperienceEditorPage() {
  const create = useCreateExperience();
  const { notify } = useToast();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ExperienceForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: "",
      role: "",
      location: "",
      start_date: new Date().toISOString().slice(0, 10),
      end_date: "",
      description: "",
      current: true,
      order_index: 0,
    },
  });

  return (
    <section className="pb-20 lg:pb-0">
      <AdminPageHeader title="New Experience" description="Add a new job or work history entry to the public timeline." />
      <form onSubmit={handleSubmit(async (values) => {
        const toDateTime = (value?: string | null) => (value ? `${value}T00:00:00` : null);
        await create.mutateAsync({
          company: values.company,
          role: values.role,
          location: values.location,
          start_date: toDateTime(values.start_date),
          end_date: values.current ? null : toDateTime(values.end_date),
          description: values.description,
          current: values.current,
          order_index: values.order_index,
        });
        notify("Experience saved.", "success");
        navigate("/admin/experience");
      })} className="grid gap-5 rounded-lg border border-white/10 bg-white/[.035] p-5 lg:grid-cols-2">
        <label>
          <span className="text-sm font-semibold text-slate-200">Company</span>
          <input className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm" {...register("company")} />
          {errors.company ? <span className="mt-1 block text-xs text-rose-300">Required</span> : null}
        </label>
        <label>
          <span className="text-sm font-semibold text-slate-200">Role</span>
          <input className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm" {...register("role")} />
          {errors.role ? <span className="mt-1 block text-xs text-rose-300">Required</span> : null}
        </label>
        <label>
          <span className="text-sm font-semibold text-slate-200">Location</span>
          <input className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm" {...register("location")} />
          {errors.location ? <span className="mt-1 block text-xs text-rose-300">Required</span> : null}
        </label>
        <label>
          <span className="text-sm font-semibold text-slate-200">Order</span>
          <input type="number" className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm" {...register("order_index", { valueAsNumber: true })} />
        </label>
        <label>
          <span className="text-sm font-semibold text-slate-200">Start date</span>
          <input type="date" className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm" {...register("start_date")} />
        </label>
        <label>
          <span className="text-sm font-semibold text-slate-200">End date</span>
          <input type="date" className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm" {...register("end_date")} />
        </label>
        <label className="flex items-center gap-3 pt-8">
          <input type="checkbox" {...register("current")} />
          <span className="text-sm font-semibold text-slate-200">Current role</span>
        </label>
        <label className="lg:col-span-2">
          <span className="text-sm font-semibold text-slate-200">Description</span>
          <textarea className="mt-2 min-h-28 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-3 text-sm" {...register("description")} />
          {errors.description ? <span className="mt-1 block text-xs text-rose-300">Required</span> : null}
        </label>
        <Button className="lg:col-span-2" type="submit" disabled={isSubmitting} icon={<Save className="size-4" />}>{isSubmitting ? "Saving..." : "Save Experience"}</Button>
      </form>
    </section>
  );
}
