import { AdminPageHeader } from "../../components/admin/AdminTable";

export function AdminSettingsPage() {
  return <section className="pb-20 lg:pb-0"><AdminPageHeader title="Settings" description="Application preferences prepared for backend persistence." /><div className="grid gap-4 md:grid-cols-2"><label className="rounded-lg border border-white/10 bg-white/[.035] p-5"><span className="font-semibold text-white">Mock API Mode</span><p className="mt-2 text-sm text-slate-400">Controlled by VITE_USE_MOCK_API.</p></label><label className="rounded-lg border border-white/10 bg-white/[.035] p-5"><span className="font-semibold text-white">API Base URL</span><p className="mt-2 text-sm text-slate-400">Controlled by VITE_API_BASE_URL.</p></label></div></section>;
}
