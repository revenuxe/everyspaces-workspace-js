import type { Metadata } from "next";
import { RouteShell } from "@/components/RouteShell";
import CertificationPage from "@/route-pages/CertificationPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "EverySpaces Workspace Certification | Verified Workspace Reviews & Badges",
  description:
    "Learn how EverySpaces reviews, audits, and scores coworking spaces and office space listings with workspace certification, verified workspace badges, and clear workspace reviews.",
  path: "/certification",
  keywords:
    "workspace certification, verified workspace, coworking spaces, office space, best workspaces, workspace reviews, workspace badges, office space evaluation",
});

export default function CertificationRoutePage() {
  return (
    <RouteShell pathname="/certification">
      <CertificationPage />
    </RouteShell>
  );
}
