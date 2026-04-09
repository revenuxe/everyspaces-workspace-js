import type { Metadata } from "next";
import Contact from "@/route-pages/Contact";
import { RouteShell } from "@/components/RouteShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact EverySpaces - Get a Free Office Space Consultation in Bangalore",
  description:
    "Reach out to EverySpaces for expert workspace consulting in Bangalore. Get a free consultation for coworking spaces, private offices and commercial real estate. Quick response guaranteed.",
  path: "/contact",
  keywords:
    "contact EverySpaces, office space consultation Bangalore, workspace advisor Bangalore, coworking inquiry, commercial real estate agent Bangalore, office broker Bangalore",
});

export default function ContactPage() {
  return (
    <RouteShell pathname="/contact">
      <Contact />
    </RouteShell>
  );
}
