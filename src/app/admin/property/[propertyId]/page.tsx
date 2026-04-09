import type { Metadata } from "next";
import AdminPropertyForm from "@/route-pages/AdminPropertyForm";
import { RouteShell } from "@/components/RouteShell";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ propertyId: string }> }): Promise<Metadata> {
  const { propertyId } = await params;
  return buildMetadata({
    title: propertyId === "new" ? "Add Property | Admin" : "Edit Property | Admin",
    description: "Admin property form.",
    path: `/admin/property/${propertyId}`,
    noIndex: true,
  });
}

export default async function AdminPropertyRoute({ params }: { params: Promise<{ propertyId: string }> }) {
  const { propertyId } = await params;
  return (
    <RouteShell pathname={`/admin/property/${propertyId}`} params={{ propertyId }}>
      <AdminPropertyForm />
    </RouteShell>
  );
}
