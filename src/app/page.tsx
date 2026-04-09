import type { Metadata } from "next";
import Index from "@/route-pages/Index";
import { RouteShell } from "@/components/RouteShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Office Space, Coworking & Managed Workspaces | EverySpaces",
  description:
    "Find office space, coworking spaces, private offices, managed workspaces and flexible office solutions for startups, SMEs and enterprises. EverySpaces helps teams compare locations, shortlist faster and secure the right workspace.",
  path: "/",
  keywords:
    "office space, coworking space, managed office, private office, flexible workspace, office space for rent, shared office space, commercial office space, office for rent, coworking near me, workspace solutions, managed workspaces",
});

export default function HomePage() {
  return (
    <RouteShell pathname="/">
      <Index />
    </RouteShell>
  );
}
