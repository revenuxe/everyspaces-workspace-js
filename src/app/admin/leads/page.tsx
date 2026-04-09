import type { Metadata } from "next";
import AdminLeads from "@/route-pages/AdminLeads";
import { RouteShell } from "@/components/RouteShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Leads | EverySpaces Admin", description: "Admin leads.", path: "/admin/leads", noIndex: true });

export default function AdminLeadsRoute() {
  return (
    <RouteShell pathname="/admin/leads">
      <AdminLeads />
    </RouteShell>
  );
}
