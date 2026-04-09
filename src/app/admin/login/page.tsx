import type { Metadata } from "next";
import AdminLogin from "@/route-pages/AdminLogin";
import { RouteShell } from "@/components/RouteShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ title: "Admin Login | EverySpaces", description: "Admin login portal for EverySpaces.", path: "/admin/login", noIndex: true });

export default function AdminLoginRoute() {
  return (
    <RouteShell pathname="/admin/login">
      <AdminLogin />
    </RouteShell>
  );
}
