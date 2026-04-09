import type { Metadata } from "next";
import ListingsPage from "@/route-pages/ListingsPage";
import { RouteShell } from "@/components/RouteShell";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { getListingsPageData } from "@/lib/server-data";

export const metadata: Metadata = buildMetadata({
  title: "Office Space & Coworking Listings | EverySpaces",
  description:
    "Browse premium office spaces, coworking desks and managed workspaces for rent in Bangalore and Hyderabad. Filter by location, budget, capacity and amenities.",
  path: "/listings",
  keywords:
    "office space listings, coworking space for rent, office space Bangalore, coworking Hyderabad, managed office listings",
});

export default async function ListingsRoute() {
  const data = await getListingsPageData();

  return (
    <>
      <RouteShell pathname="/listings">
        <ListingsPage initialProperties={data.properties} initialPropertyTypes={data.propertyTypes} initialAmenitiesList={data.amenities} />
      </RouteShell>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: absoluteUrl("/") }, { name: "Listings", url: absoluteUrl("/listings") }])} />
    </>
  );
}
