import type { Metadata } from "next";
import ThankYou from "@/route-pages/ThankYou";
import { RouteShell } from "@/components/RouteShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Thank You | EverySpaces",
  description: "Thank you for contacting EverySpaces.",
  path: "/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <RouteShell pathname="/thank-you">
      <ThankYou />
    </RouteShell>
  );
}
