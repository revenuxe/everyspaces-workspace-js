import type { Metadata } from "next";
import PrivacyPolicy from "@/route-pages/PrivacyPolicy";
import { RouteShell } from "@/components/RouteShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | EverySpaces",
  description: "Read the EverySpaces privacy policy and learn how we handle your information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <RouteShell pathname="/privacy-policy">
      <PrivacyPolicy />
    </RouteShell>
  );
}
