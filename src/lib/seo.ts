import type { Metadata } from "next";
import { allAreas } from "@/data/areas";
import { cityContent } from "@/data/cityContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.everyspaces.com";

export const defaultMetadata = {
  siteUrl,
  siteName: "EverySpaces",
  locale: "en_IN",
  title: "EverySpaces - Office Space, Coworking & Managed Workspaces",
  description:
    "EverySpaces helps businesses find office space, coworking desks, managed offices, private offices and flexible workspaces with expert consulting, faster shortlisting and smarter leasing support.",
  ogImage: `${siteUrl}/opengraph-image`,
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

export function brandSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: "EverySpaces",
    url: defaultMetadata.siteUrl,
    logo: absoluteUrl("/everyspaces-logo.webp"),
    slogan: "Find the right office space faster.",
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

export function collectionPageSchema({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: Array<{ name: string; url: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: defaultMetadata.siteName,
      url: defaultMetadata.siteUrl,
    },
    about: {
      "@type": "Thing",
      name: "Office space, coworking, managed workspace and workplace strategy",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };
}

export function personSchema({
  name,
  url,
  description,
  image,
  jobTitle,
}: {
  name: string;
  url?: string;
  description?: string;
  image?: string;
  jobTitle?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
    description,
    image,
    jobTitle,
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  keywords,
  section,
}: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string;
  keywords?: string[];
  section?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: url,
    headline,
    description,
    image: image ? [image] : undefined,
    datePublished,
    dateModified,
    articleSection: section,
    keywords,
    author: authorName
      ? {
          "@type": "Person",
          name: authorName,
          url: authorUrl,
        }
      : {
          "@type": "Organization",
          name: defaultMetadata.siteName,
          url: defaultMetadata.siteUrl,
        },
    publisher: {
      "@type": "Organization",
      name: defaultMetadata.siteName,
      url: defaultMetadata.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/everyspaces-logo.webp"),
      },
    },
  };
}

export function getStaticPublicPaths() {
  const basePaths = ["/", "/about", "/blog", "/certification", "/certification/contact-us", "/contact", "/privacy-policy", "/terms-and-conditions", "/areas-we-serve", "/listings"];
  const cityPaths = Object.values(cityContent).map((city) => `/office-space/${city.citySlug}`);
  const areaPaths = allAreas.map((area) => `/office-space/${area.citySlug}/${area.slug}`);
  return [...basePaths, ...cityPaths, ...areaPaths];
}

export function buildArticleMetadata({
  title,
  description,
  path,
  keywords,
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  image?: string;
  noIndex?: boolean;
}): Metadata {
  return {
    ...buildMetadata({
      title,
      description,
      path,
      keywords,
      ogType: "article",
      noIndex,
    }),
    openGraph: {
      type: "article",
      siteName: defaultMetadata.siteName,
      locale: defaultMetadata.locale,
      title,
      description,
      url: absoluteUrl(path),
      images: [image || defaultMetadata.ogImage],
      publishedTime,
      modifiedTime,
      authors,
      section,
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || defaultMetadata.ogImage],
    },
  };
}
