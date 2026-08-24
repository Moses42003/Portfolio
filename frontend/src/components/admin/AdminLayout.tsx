import { Bell, Briefcase, FolderKanban, Gauge, LogOut, MessageSquare, Newspaper, PlusCircle, Search, Settings, Shapes, Sparkles, Tags, User } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";

const sections = [
  {
    label: "MAIN",
    items: [
      { to: "/admin", label: "Dashboard", icon: Gauge },
      { to: "/admin/projects", label: "Projects", icon: FolderKanban },
      { to: "/admin/skills", label: "Skills", icon: Sparkles },
      { to: "/admin/experience", label: "Experience", icon: Briefcase },
      { to: "/admin/blog", label: "Blog", icon: Newspaper },
      { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
      { to: "/admin/messages", label: "Messages", icon: MessageSquare },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { to: "/admin/categories", label: "Categories", icon: Tags },
      { to: "/admin/technologies", label: "Technologies", icon: Shapes },
    ],
  },
  {
    label: "SETTINGS",
    items: [
      { to: "/admin/profile", label: "Profile", icon: User },
      { to: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      <aside className="admin-sidebar fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-slate-950/90 p-4 lg:block overflow-y-auto pb-20">
        <div className="mb-8 px-3 py-4 text-xl font-black text-white">
          <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">MOSES DEV</span>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Admin</p>
        </div>
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.label}>
              <p className="mb-2 px-3 text-xs font-bold tracking-[0.18em] text-slate-500">{section.label}</p>
              <div className="grid gap-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink key={item.to} to={item.to} end={item.to === "/admin"} className={({ isActive }) => cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/[.05] hover:text-white", isActive && "bg-violet-500/15 text-white ring-1 ring-violet-400/30")}>
                      <Icon className="size-4" aria-hidden="true" />
                      {item.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="absolute bottom-4 left-4 right-4 justify-start" onClick={handleLogout} icon={<LogOut className="size-4" aria-hidden="true" />}>Logout</Button>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070a12]/85 px-4 py-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative hidden w-full max-w-md sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
              <input className="h-10 w-full rounded-lg border border-white/10 bg-white/[.04] pl-10 pr-4 text-sm outline-none focus:border-violet-400" placeholder="Search admin content" />
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Button variant="secondary" className="hidden sm:inline-flex" icon={<PlusCircle className="size-4" aria-hidden="true" />}>Quick Add</Button>
              <button className="inline-flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[.04] text-slate-300" aria-label="Notifications">
                <Bell className="size-4" aria-hidden="true" />
              </button>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[.04] px-3 py-2">
                <div className="grid size-8 place-items-center rounded-md bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold">{user?.name.slice(0, 1) ?? "M"}</div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-white">{user?.name ?? "Admin"}</p>
                  <p className="text-xs text-slate-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6">
          <Outlet />
        </main>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-white/10 bg-slate-950/95 p-2 lg:hidden">
        {sections[0].items.slice(0, 5).map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.to} to={item.to} end={item.to === "/admin"} className={({ isActive }) => cn("flex flex-col items-center gap-1 rounded-md py-2 text-[11px] text-slate-400", isActive && "bg-violet-500/15 text-white")}>
              <Icon className="size-4" aria-hidden="true" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
