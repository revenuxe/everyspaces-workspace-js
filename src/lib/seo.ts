import type { Metadata } from "next";
import { allAreas } from "@/data/areas";
import { cityContent } from "@/data/cityContent";

export const defaultMetadata = {
  siteUrl: "https://everyspaces.com",
  siteName: "EverySpaces",
  locale: "en_IN",
  title: "EverySpaces - Office Space, Coworking & Managed Workspaces",
  description:
    "EverySpaces helps businesses find office space, coworking desks, managed offices, private offices and flexible workspaces with expert consulting, faster shortlisting and smarter leasing support.",
  ogImage: "https://everyspaces.com/opengraph-image",
};

export function absoluteUrl(path: string) {
  return new URL(path, defaultMetadata.siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  ogType = "website",
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  return {
    title,
    description,
    keywords,
    category: "Commercial Real Estate",
    applicationName: defaultMetadata.siteName,
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: absoluteUrl(path),
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
    openGraph: {
      type: ogType,
      siteName: defaultMetadata.siteName,
      locale: defaultMetadata.locale,
      title,
      description,
      url: absoluteUrl(path),
      images: [defaultMetadata.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultMetadata.ogImage],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: defaultMetadata.siteName,
    url: defaultMetadata.siteUrl,
    description: defaultMetadata.description,
    inLanguage: "en-IN",
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "EverySpaces",
    description: "Expert workspace consulting and office space solutions in Bangalore",
    url: defaultMetadata.siteUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: "HBR Layout",
      addressLocality: "Bangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    telephone: "+919886285028",
    email: "everyspaces.com@gmail.com",
    foundingDate: "2025",
    sameAs: [
      "https://www.linkedin.com/company/everyspaces",
      "https://www.instagram.com/every.spaces/",
    ],
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getStaticPublicPaths() {
  const basePaths = ["/", "/about", "/contact", "/privacy-policy", "/terms-and-conditions", "/areas-we-serve", "/listings"];
  const cityPaths = Object.values(cityContent).map((city) => `/office-space/${city.citySlug}`);
  const areaPaths = allAreas.map((area) => `/office-space/${area.citySlug}/${area.slug}`);
  return [...basePaths, ...cityPaths, ...areaPaths];
}
