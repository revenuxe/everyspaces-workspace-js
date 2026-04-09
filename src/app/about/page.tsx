import type { Metadata } from "next";
import AboutUs from "@/route-pages/AboutUs";
import { RouteShell } from "@/components/RouteShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About EverySpaces - Bangalore's Trusted Workspace Consulting Firm | Est. 2025",
  description:
    "Learn about EverySpaces, Bangalore's expert workspace consultants founded in 2025. We help startups and enterprises find coworking spaces, private offices and remote work solutions across Bangalore.",
  path: "/about",
  keywords:
    "about EverySpaces, workspace consulting Bangalore, office space advisor, coworking consultant India, remote work solutions Bangalore, commercial real estate Bangalore, workspace strategy",
});

export default function AboutPage() {
  return (
    <RouteShell pathname="/about">
      <AboutUs />
    </RouteShell>
  );
}
