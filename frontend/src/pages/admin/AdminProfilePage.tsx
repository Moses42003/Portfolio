import { AdminPageHeader } from "../../components/admin/AdminTable";
import { LoadingState } from "../../components/ui/States";
import { useProfile } from "../../features/profile/hooks";
import { asArray } from "../../lib/utils";

export function AdminProfilePage() {
  const query = useProfile();
  const stats = asArray(query.data?.stats);

  if (query.isLoading || !query.data) return <LoadingState />;
  return <section className="pb-20 lg:pb-0"><AdminPageHeader title="Profile" description="Backend-ready profile content, social links, CV link, and statistics." /><div className="rounded-lg border border-white/10 bg-white/[.035] p-5"><h2 className="text-2xl font-bold text-white">{query.data.name}</h2><p className="mt-2 text-slate-300">{query.data.headline ?? query.data.summary ?? "Profile ready for updates."}</p><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{stats.map((stat) => <div key={stat.id ?? stat.label} className="rounded-md border border-white/10 p-4"><p className="text-2xl font-black text-white">{stat.value}</p><p className="text-sm text-slate-400">{stat.label}</p></div>)}</div></div></section>;
}
