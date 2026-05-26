import type { Metadata } from "next";
import AreasWeServePage from "@/route-pages/AreasWeServePage";
import { RouteShell } from "@/components/RouteShell";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Areas We Serve - Office Space & Coworking Locations | EverySpaces",
  description:
    "Explore all Bangalore locations where EverySpaces provides coworking spaces, office space for rent and managed workspaces.",
  path: "/areas-we-serve",
  keywords:
    "coworking space locations Bangalore, office space for rent Bangalore, coworking near me Bangalore, Bengaluru office space, managed office locations Bangalore",
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
