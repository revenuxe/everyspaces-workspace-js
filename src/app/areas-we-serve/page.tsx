import type { Metadata } from "next";
import AreasWeServePage from "@/route-pages/AreasWeServePage";
import { RouteShell } from "@/components/RouteShell";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Areas We Serve - Office Space & Coworking Locations | EverySpaces",
  description:
    "Explore all locations where EverySpaces provides coworking spaces, office space for rent and managed workspaces. Serving Bangalore, Hyderabad and more.",
  path: "/areas-we-serve",
  keywords:
    "coworking space locations, office space for rent, coworking near me, office space Bangalore, coworking Hyderabad, managed office locations",
});

export default function AreasPage() {
  return (
    <>
      <RouteShell pathname="/areas-we-serve">
        <AreasWeServePage />
      </RouteShell>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: absoluteUrl("/") }, { name: "Areas We Serve", url: absoluteUrl("/areas-we-serve") }])} />
    </>
  );
}
