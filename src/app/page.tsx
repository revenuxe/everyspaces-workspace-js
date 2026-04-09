import type { Metadata } from "next";
import Index from "@/route-pages/Index";
import { RouteShell } from "@/components/RouteShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Best Coworking & Office Space in Bangalore | Workspace Solutions",
  description:
    "Find affordable coworking spaces, private offices and managed workspaces in Bangalore and Hyderabad. EverySpaces offers expert workspace consulting, office space for rent and flexible desk solutions for startups and enterprises.",
  path: "/",
  keywords:
    "coworking space Bangalore, office space for rent Bangalore, coworking space Hyderabad, managed office Hyderabad, shared office space, flexible workspace Bangalore, commercial office space, workspace solutions, coworking near me, office on rent Bangalore, HITEC City office, Koramangala coworking",
});

export default function HomePage() {
  return (
    <RouteShell pathname="/">
      <Index />
    </RouteShell>
  );
}
