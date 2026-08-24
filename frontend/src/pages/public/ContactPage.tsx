import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseBusiness, GitBranch, Globe, Mail, MapPin, Phone, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PageShell } from "../../components/layout/PageShell";
import { Button } from "../../components/ui/Button";
import { Seo } from "../../components/ui/Seo";
import { useToast } from "../../components/ui/Toast";
import { useSubmitContact } from "../../features/contact/hooks";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email("Enter a valid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactForm = z.infer<typeof schema>;

export function ContactPage() {
  const { notify } = useToast();
  const mutation = useSubmitContact();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({ resolver: zodResolver(schema) });
  const onSubmit = handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync(values);
      notify("Message sent successfully.", "success");
      reset();
    } catch (error) {
      notify(error instanceof Error ? error.message : "Unable to send message.", "error");
    }
  });
  return (
    <>
      <Seo title="Contact" path="/contact" />
      <PageShell eyebrow="Contact" title="Let's build something useful together." description="Have a project, API integration, dashboard, or product idea? Send the details and I will get back to you.">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <aside className="rounded-lg border border-white/10 bg-white/[.035] p-6">
            <h2 className="text-2xl font-bold text-white">Contact Details</h2>
            <div className="mt-6 grid gap-4 text-slate-300">
              <p className="flex items-center gap-3"><Mail className="size-5 text-violet-300" /> moses@example.com</p>
              <p className="flex items-center gap-3"><Phone className="size-5 text-violet-300" /> +233 000 000 000</p>
              <p className="flex items-center gap-3"><MapPin className="size-5 text-violet-300" /> Accra, Ghana</p>
            </div>
            <div className="mt-8 flex gap-3">
              {[GitBranch, BriefcaseBusiness, Globe, Mail].map((Icon, index) => <a key={index} href="#" className="grid size-11 place-items-center rounded-lg border border-white/10 bg-slate-950/60 text-slate-300" aria-label={`Social link ${index + 1}`}><Icon className="size-5" /></a>)}
            </div>
          </aside>
          <form onSubmit={onSubmit} className="rounded-lg border border-white/10 bg-white/[.035] p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                ["name", "Your Name", "Enter your name"],
                ["email", "Email", "Enter your email"],
                ["subject", "Subject", "Project inquiry"],
              ].map(([name, label, placeholder]) => (
                <label key={name} className={name === "subject" ? "sm:col-span-2" : ""}>
                  <span className="text-sm font-semibold text-slate-200">{label}</span>
                  <input className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 text-sm text-white outline-none focus:border-violet-400" placeholder={placeholder} {...register(name as keyof ContactForm)} />
                  {errors[name as keyof ContactForm] ? <span className="mt-1 block text-xs text-rose-300">{errors[name as keyof ContactForm]?.message}</span> : null}
                </label>
              ))}
              <label className="sm:col-span-2">
                <span className="text-sm font-semibold text-slate-200">Message</span>
                <textarea className="mt-2 min-h-40 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-3 text-sm text-white outline-none focus:border-violet-400" placeholder="Tell me about your project..." {...register("message")} />
                {errors.message ? <span className="mt-1 block text-xs text-rose-300">{errors.message.message}</span> : null}
              </label>
            </div>
            <Button className="mt-6 w-full" type="submit" disabled={mutation.isPending} icon={<Send className="size-4" aria-hidden="true" />}>{mutation.isPending ? "Sending..." : "Send Message"}</Button>
          </form>
        </div>
      </PageShell>
    </>
  );
}
