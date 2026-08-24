import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../components/ui/Button";
import { Seo } from "../../components/ui/Seo";
import { useToast } from "../../components/ui/Toast";
import { useAuth } from "../../providers/AuthProvider";

const schema = z.object({ email: z.email("Enter a valid email."), password: z.string().min(1, "Password is required.") });
type LoginForm = z.infer<typeof schema>;

export function AdminLoginPage() {
  const { status, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { notify } = useToast();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({ resolver: zodResolver(schema), defaultValues: { email: "admin@moses.dev" } });
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/admin";
  if (status === "authenticated") return <Navigate to="/admin" replace />;
  return (
    <main className="grid min-h-screen place-items-center bg-[#070a12] px-4 text-slate-100">
      <Seo title="Admin Login" path="/admin/login" />
      <form onSubmit={handleSubmit(async (values) => {
        try {
          await login(values);
          notify("Signed in successfully.", "success");
          navigate(from, { replace: true });
        } catch (error) {
          notify(error instanceof Error ? error.message : "Unable to sign in.", "error");
        }
      })} className="w-full max-w-md rounded-lg border border-white/10 bg-white/[.035] p-6 shadow-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">MOSES DEV Admin</p>
        <h1 className="mt-2 text-3xl font-black text-white">Sign in</h1>
        <label className="mt-8 block">
          <span className="text-sm font-semibold text-slate-200">Email</span>
          <div className="relative mt-2">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
            <input className="h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 pl-10 pr-3 text-sm outline-none focus:border-violet-400" {...register("email")} />
          </div>
          {errors.email ? <span className="mt-1 block text-xs text-rose-300">{errors.email.message}</span> : null}
        </label>
        <label className="mt-5 block">
          <span className="text-sm font-semibold text-slate-200">Password</span>
          <div className="relative mt-2">
            <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
            <input type="password" className="h-11 w-full rounded-lg border border-white/10 bg-slate-950/60 pl-10 pr-3 text-sm outline-none focus:border-violet-400" {...register("password")} />
          </div>
          {errors.password ? <span className="mt-1 block text-xs text-rose-300">{errors.password.message}</span> : null}
        </label>
        <Button className="mt-6 w-full" type="submit" disabled={isSubmitting}>{isSubmitting ? "Signing in..." : "Sign In"}</Button>
      </form>
    </main>
  );
}
