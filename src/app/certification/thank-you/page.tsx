import type { Metadata } from "next";
import { RouteShell } from "@/components/RouteShell";
import CertificationThankYou from "@/route-pages/CertificationThankYou";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Certification Request Received | Numunix",
  description: "Thank you for submitting your Numunix certification request.",
  path: "/certification/thank-you",
  noIndex: true,
});

export default function CertificationThankYouPage() {
  return (
    <RouteShell pathname="/certification/thank-you">
      <CertificationThankYou />
    </RouteShell>
  );
}
