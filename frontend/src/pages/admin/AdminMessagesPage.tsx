import { AdminPageHeader, AdminTable } from "../../components/admin/AdminTable";
import { LoadingState } from "../../components/ui/States";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api/client";
import { formatDate } from "../../lib/utils";

export function AdminMessagesPage() {
  const query = useQuery({ queryKey: ["admin", "messages"], queryFn: api.admin.messages });
  const messages = Array.isArray(query.data) ? query.data : [];

  return (
    <section className="pb-20 lg:pb-0">
      <AdminPageHeader title="Messages" description="Inbox prepared for read, replied, archived, update, and delete workflows." />
      {query.isLoading ? <LoadingState /> : (
        <AdminTable headers={["Sender", "Email", "Subject", "Received", "Status"]}>
          {messages.map((message: any) => {
            const receivedAt = message.received_at ?? message.created_at ?? message.updated_at ?? "";
            const status = message.status ?? (message.read ? "read" : "unread");
            return (
              <tr key={message.id}>
                <td className="px-4 py-4 font-semibold text-white">{message.name}</td>
                <td className="px-4 py-4">{message.email}</td>
                <td className="px-4 py-4">{message.subject}</td>
                <td className="px-4 py-4">{receivedAt ? formatDate(receivedAt) : "—"}</td>
                <td className="px-4 py-4 capitalize">{status}</td>
              </tr>
            );
          })}
        </AdminTable>
      )}
    </section>
  );
}
