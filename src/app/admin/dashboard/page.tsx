import type { Metadata } from "next";
import AdminDashboard from "@/route-pages/AdminDashboard";
import { RouteShell } from "@/components/RouteShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Admin Dashboard | EverySpaces", description: "Admin dashboard.", path: "/admin/dashboard", noIndex: true });

export default function AdminDashboardRoute() {
  return (
    <RouteShell pathname="/admin/dashboard">
      <AdminDashboard />
    </RouteShell>
  );
}
