import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SITE_NAME } from "../../lib/constants";
import { cn } from "../../lib/utils";
import { LinkButton } from "../ui/Button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export function PublicNavigation() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <Link to="/" className="text-lg font-black tracking-wide text-white">
          <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">{SITE_NAME}</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={({ isActive }) => cn("relative rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-white", isActive && "text-white after:absolute after:inset-x-3 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-violet-400")}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <LinkButton to="/contact" icon={<ArrowUpRight className="size-4" aria-hidden="true" />}>Let's Talk</LinkButton>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <button className="inline-flex size-10 items-center justify-center rounded-lg border border-white/10 text-white" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </nav>
      {open ? (
        <div className="fixed inset-0 z-[70] bg-slate-950 p-4 lg:hidden">
          <div className="rounded-2xl border border-slate-700/80 bg-slate-900/95 p-4 shadow-2xl shadow-slate-950/40">
            <div className="flex items-center justify-between">
              <span className="font-black text-white">{SITE_NAME}</span>
              <button className="inline-flex size-10 items-center justify-center rounded-lg border border-slate-600 bg-slate-800 text-white" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-8 grid gap-3">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === "/"} onClick={() => setOpen(false)} className={({ isActive }) => cn("rounded-xl border border-slate-700/80 bg-slate-800/80 px-4 py-3 text-lg font-semibold text-slate-100 transition hover:border-violet-400/60 hover:bg-slate-800", isActive && "border-violet-400/60 bg-violet-500/15 text-white")}>
                  {link.label}
                </NavLink>
              ))}
              <LinkButton to="/contact" className="mt-3" onClick={() => setOpen(false)} icon={<ArrowUpRight className="size-4" aria-hidden="true" />}>Let's Talk</LinkButton>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
