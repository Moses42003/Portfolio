import { AdminPageHeader, AdminTable } from "../../components/admin/AdminTable";
import { categories } from "../../services/api/mock/data";

export function AdminCategoriesPage() {
  return <section className="pb-20 lg:pb-0"><AdminPageHeader title="Categories" description="Manage reusable project and blog categories." /><AdminTable headers={["Name", "Slug", "Description"]}>{categories.map((category) => <tr key={category.id}><td className="px-4 py-4 font-semibold text-white">{category.name}</td><td className="px-4 py-4">{category.slug}</td><td className="px-4 py-4">{category.description ?? "API-ready category"}</td></tr>)}</AdminTable></section>;
}
