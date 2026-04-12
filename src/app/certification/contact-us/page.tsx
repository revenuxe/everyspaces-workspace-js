import type { Metadata } from "next";
import { RouteShell } from "@/components/RouteShell";
import CertificationContact from "@/route-pages/CertificationContact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Book EverySpaces Certification | Workspace Review Request",
  description:
    "Request EverySpaces workspace certification for your coworking space or office space and submit your details for a free certification review.",
  path: "/certification/contact-us",
  keywords:
    "workspace certification booking, verified workspace request, coworking space certification, office space certification, certification review form",
});

export default function CertificationContactRoutePage() {
  return (
    <RouteShell pathname="/certification/contact-us">
      <CertificationContact />
    </RouteShell>
  );
}
