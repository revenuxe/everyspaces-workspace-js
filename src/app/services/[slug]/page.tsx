import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/route-pages/ServiceDetailPage";
import { RouteShell } from "@/components/RouteShell";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, breadcrumbSchema, buildMetadata } from "@/lib/seo";
import { getServicePage, servicePages } from "@/data/servicePages";

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    return buildMetadata({
      title: "Service Not Found | EverySpaces",
      description: "The requested EverySpaces service page could not be found.",
      path: `/services/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
  });
}

export default async function ServiceRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    notFound();
  }

  const path = `/services/${service.slug}`;

  return (
    <>
      <RouteShell pathname={path} params={{ slug: service.slug }}>
        <ServiceDetailPage service={service} />
      </RouteShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: absoluteUrl("/") },
            { name: "Services", url: absoluteUrl("/#service") },
            { name: service.title, url: absoluteUrl(path) },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: {
              "@type": "Organization",
              name: "EverySpaces",
              url: absoluteUrl("/"),
            },
            areaServed: ["Bangalore", "Hyderabad"],
            url: absoluteUrl(path),
          },
        ]}
      />
    </>
  );
}
