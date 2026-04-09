import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AreaPage from "@/route-pages/AreaPage";
import { RouteShell } from "@/components/RouteShell";
import { JsonLd } from "@/components/JsonLd";
import { getAreaBySlug } from "@/data/areas";
import { absoluteUrl, breadcrumbSchema, buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ citySlug: string; areaSlug: string }> }): Promise<Metadata> {
  const { citySlug, areaSlug } = await params;
  const area = getAreaBySlug(citySlug, areaSlug);

  if (!area) {
    return buildMetadata({ title: "Area Not Found | EverySpaces", description: "The requested area page could not be found.", path: `/office-space/${citySlug}/${areaSlug}`, noIndex: true });
  }

  return buildMetadata({
    title: area.metaTitle,
    description: area.metaDescription,
    path: `/office-space/${area.citySlug}/${area.slug}`,
    keywords: `coworking space ${area.name}, office space ${area.name} ${area.city}, managed office ${area.name}, shared office ${area.name}, coworking near ${area.name}, workspace ${area.name}`,
  });
}

export default async function AreaRoute({ params }: { params: Promise<{ citySlug: string; areaSlug: string }> }) {
  const { citySlug, areaSlug } = await params;
  const area = getAreaBySlug(citySlug, areaSlug);

  if (!area) {
    notFound();
  }

  return (
    <>
      <RouteShell pathname={`/office-space/${area.citySlug}/${area.slug}`} params={{ citySlug: area.citySlug, areaSlug: area.slug }}>
        <AreaPage />
      </RouteShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: area.city, url: absoluteUrl(`/office-space/${area.citySlug}`) },
          { name: area.name, url: absoluteUrl(`/office-space/${area.citySlug}/${area.slug}`) },
        ])}
      />
    </>
  );
}
