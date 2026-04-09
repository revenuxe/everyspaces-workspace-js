import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../index.css";
import Providers from "./providers";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, defaultMetadata, organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(defaultMetadata.siteUrl),
  title: {
    default: defaultMetadata.title,
    template: "%s | EverySpaces",
  },
  description: defaultMetadata.description,
  applicationName: defaultMetadata.siteName,
  referrer: "origin-when-cross-origin",
  category: "Commercial Real Estate",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    siteName: defaultMetadata.siteName,
    locale: defaultMetadata.locale,
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    url: absoluteUrl("/"),
    images: [defaultMetadata.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    images: [defaultMetadata.ogImage],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
