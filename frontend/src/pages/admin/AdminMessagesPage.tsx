import { AdminPageHeader, AdminTable } from "../../components/admin/AdminTable";
import { LoadingState } from "../../components/ui/States";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api/client";
import { formatDate } from "../../lib/utils";

export function AdminMessagesPage() {
  const query = useQuery({ queryKey: ["admin", "messages"], queryFn: api.admin.messages });
  return (
    <section className="pb-20 lg:pb-0">
      <AdminPageHeader title="Messages" description="Inbox prepared for read, replied, archived, update, and delete workflows." />
      {query.isLoading ? <LoadingState /> : <AdminTable headers={["Sender", "Email", "Subject", "Received", "Status"]}>{query.data?.map((message) => <tr key={message.id}><td className="px-4 py-4 font-semibold text-white">{message.name}</td><td className="px-4 py-4">{message.email}</td><td className="px-4 py-4">{message.subject}</td><td className="px-4 py-4">{formatDate(message.received_at)}</td><td className="px-4 py-4 capitalize">{message.status}</td></tr>)}</AdminTable>}
    </section>
  );
}
