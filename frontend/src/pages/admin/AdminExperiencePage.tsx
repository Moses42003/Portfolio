import { Plus } from "lucide-react";
import { AdminPageHeader, AdminTable } from "../../components/admin/AdminTable";
import { Button } from "../../components/ui/Button";
import { LoadingState } from "../../components/ui/States";
import { useAdminExperience } from "../../features/experience/hooks";
import { formatYearRange } from "../../lib/utils";

export function AdminExperiencePage() {
  const query = useAdminExperience();
  return (
    <section className="pb-20 lg:pb-0">
      <AdminPageHeader title="Experience" description="Manage company, role, location, dates, responsibilities, and technology lists." action={<Button icon={<Plus className="size-4" />}>Add Experience</Button>} />
      {query.isLoading ? <LoadingState /> : <AdminTable headers={["Role", "Company", "Location", "Dates", "Technologies"]}>{query.data?.map((item) => <tr key={item.id}><td className="px-4 py-4 font-semibold text-white">{item.role}</td><td className="px-4 py-4">{item.company}</td><td className="px-4 py-4">{item.location}</td><td className="px-4 py-4">{formatYearRange(item.start_date, item.end_date, item.current)}</td><td className="px-4 py-4">{item.technologies.join(", ")}</td></tr>)}</AdminTable>}
    </section>
  );
}
