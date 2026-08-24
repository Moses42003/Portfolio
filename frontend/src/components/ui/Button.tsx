import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<ButtonVariant, string> = {
  primary: "border-violet-400/50 bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-[0_0_24px_rgba(124,58,237,.35)] hover:from-violet-500 hover:to-cyan-400",
  secondary: "border-white/15 bg-white/[.04] text-slate-100 hover:border-violet-400/50 hover:bg-violet-500/10",
  ghost: "border-transparent text-slate-300 hover:bg-white/[.06] hover:text-white",
  danger: "border-rose-400/50 bg-rose-500/10 text-rose-100 hover:bg-rose-500/20",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "primary", icon, children, ...props }, ref) => (
  <button ref={ref} className={cn("inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60", variants[variant], className)} {...props}>
    {icon}
    {children}
  </button>
));
Button.displayName = "Button";

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  variant?: ButtonVariant;
  icon?: ReactNode;
}

export function LinkButton({ to, className, variant = "primary", icon, children, ...props }: LinkButtonProps) {
  return (
    <Link to={to} className={cn("inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-slate-950", variants[variant], className)} {...props}>
      {icon}
      {children}
    </Link>
  );
}
