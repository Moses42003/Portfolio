import { AdminPageHeader, AdminTable } from "../../components/admin/AdminTable";
import { technologies } from "../../services/api/mock/data";

export function AdminTechnologiesPage() {
  return <section className="pb-20 lg:pb-0"><AdminPageHeader title="Technologies" description="Manage technology tags used by projects and profile content." /><AdminTable headers={["Name", "Slug", "Category"]}>{technologies.map((technology) => <tr key={technology.id}><td className="px-4 py-4 font-semibold text-white">{technology.name}</td><td className="px-4 py-4">{technology.slug}</td><td className="px-4 py-4">{technology.category}</td></tr>)}</AdminTable></section>;
}
