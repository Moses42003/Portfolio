import { AdminPageHeader, AdminTable } from "../../components/admin/AdminTable";
import { useTestimonials } from "../../features/testimonials/hooks";
import { LoadingState } from "../../components/ui/States";

export function AdminTestimonialsPage() {
  const query = useTestimonials();
  return <section className="pb-20 lg:pb-0"><AdminPageHeader title="Testimonials" description="Manage client quotes and featured testimonial visibility." />{query.isLoading ? <LoadingState /> : <AdminTable headers={["Name", "Role", "Company", "Featured"]}>{query.data?.map((item) => <tr key={item.id}><td className="px-4 py-4 font-semibold text-white">{item.name}</td><td className="px-4 py-4">{item.role}</td><td className="px-4 py-4">{item.company}</td><td className="px-4 py-4">{item.featured ? "Yes" : "No"}</td></tr>)}</AdminTable>}</section>;
}
