import { Plus } from "lucide-react";
import { AdminPageHeader, AdminTable } from "../../components/admin/AdminTable";
import { LinkButton } from "../../components/ui/Button";
import { LoadingState } from "../../components/ui/States";
import { useAdminSkills } from "../../features/skills/hooks";

export function AdminSkillsPage() {
  const query = useAdminSkills();
  return (
    <section className="pb-20 lg:pb-0">
      <AdminPageHeader title="Skills" description="CRUD-ready skill catalog with categories, proficiency, years, featured flags, and sort order." action={<LinkButton to="/admin/skills/new" icon={<Plus className="size-4" />}>Add Skill</LinkButton>} />
      {query.isLoading ? <LoadingState /> : <AdminTable headers={["Name", "Category", "Proficiency", "Years", "Featured", "Sort"]}>{query.data?.map((skill) => <tr key={skill.id}><td className="px-4 py-4 font-semibold text-white">{skill.name}</td><td className="px-4 py-4">{skill.category}</td><td className="px-4 py-4">{skill.proficiency}</td><td className="px-4 py-4">{skill.years}</td><td className="px-4 py-4">{skill.featured ? "Yes" : "No"}</td><td className="px-4 py-4">{skill.sort_order}</td></tr>)}</AdminTable>}
    </section>
  );
}
