import type { Metadata } from "next";
import TermsConditions from "@/route-pages/TermsConditions";
import { RouteShell } from "@/components/RouteShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions | EverySpaces",
  description: "Read the EverySpaces terms and conditions for using our services and website.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <RouteShell pathname="/terms-and-conditions">
      <TermsConditions />
    </RouteShell>
  );
}
