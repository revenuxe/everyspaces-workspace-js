import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityLandingPage from "@/route-pages/CityLandingPage";
import { RouteShell } from "@/components/RouteShell";
import { JsonLd } from "@/components/JsonLd";
import { cityContent } from "@/data/cityContent";
import { absoluteUrl, breadcrumbSchema, buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ citySlug: string }> }): Promise<Metadata> {
  const { citySlug } = await params;
  const city = cityContent[citySlug];

  if (!city) {
    return buildMetadata({ title: "City Not Found | EverySpaces", description: "The requested city page could not be found.", path: `/office-space/${citySlug}`, noIndex: true });
  }

  return buildMetadata({
    title: city.metaTitle,
    description: city.metaDescription,
    path: `/office-space/${city.citySlug}`,
    keywords: `coworking space ${city.city}, office space for rent ${city.city}, managed office ${city.city}, shared office ${city.city}, coworking near me, workspace ${city.city}`,
  });
}

export default async function CityRoute({ params }: { params: Promise<{ citySlug: string }> }) {
  const { citySlug } = await params;
  const city = cityContent[citySlug];

  if (!city) {
    notFound();
  }

  return (
    <>
      <RouteShell pathname={`/office-space/${city.citySlug}`} params={{ citySlug: city.citySlug }}>
        <CityLandingPage />
      </RouteShell>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: absoluteUrl("/") }, { name: city.city, url: absoluteUrl(`/office-space/${city.citySlug}`) }])} />
    </>
  );
}
