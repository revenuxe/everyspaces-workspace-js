import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyDetailPage from "@/route-pages/PropertyDetailPage";
import { RouteShell } from "@/components/RouteShell";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { getPropertyBySlug } from "@/lib/server-data";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return buildMetadata({
      title: "Property Not Found | EverySpaces",
      description: "The requested property could not be found.",
      path: `/listings/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: property.meta_title || `${property.name} - Office Space in ${property.area}, ${property.city}`,
    description:
      property.meta_description || property.short_description || `Premium office space for rent: ${property.name} in ${property.area}, ${property.city}.`,
    path: `/listings/${property.slug}`,
    keywords: `${property.name}, office space ${property.area}, coworking ${property.city}, ${property.property_type?.name || "office"} ${property.area}`,
  });
}

export default async function PropertyRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const propertyUrl = absoluteUrl(`/listings/${property.slug}`);

  return (
    <>
      <RouteShell pathname={`/listings/${property.slug}`} params={{ slug: property.slug }}>
        <PropertyDetailPage initialProperty={property} />
      </RouteShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Listings", url: absoluteUrl("/listings") },
            { name: property.name, url: propertyUrl },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: property.name,
            description:
              property.meta_description || property.short_description || `Office space in ${property.area}, ${property.city}`,
            image: property.featured_image ? [property.featured_image] : property.images.map((image: any) => image.image_url),
            url: propertyUrl,
            brand: { "@type": "Brand", name: "EverySpaces" },
            offers: property.price
              ? {
                  "@type": "Offer",
                  priceCurrency: "INR",
                  price: property.price,
                  availability: "https://schema.org/InStock",
                  url: propertyUrl,
                }
              : undefined,
            areaServed: `${property.area}, ${property.city}`,
          },
        ]}
      />
    </>
  );
}
