import { Outlet } from "react-router-dom";
import { PublicNavigation } from "../navigation/PublicNavigation";

export function PublicLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <PublicNavigation />
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-slate-500">
        <p>MOSES DEV. Built with React, TypeScript, and FastAPI-ready architecture.</p>
      </footer>
    </div>
  );
}
