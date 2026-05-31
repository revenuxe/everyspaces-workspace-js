import type { Metadata } from "next";
import WeHelp from "@/route-pages/WeHelp";
import { RouteShell } from "@/components/RouteShell";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "We Help Startups and Businesses Find Office Spaces in Bengaluru | EverySpaces",
  description:
    "EverySpaces helps startups and businesses find coworking spaces, managed offices, plug-and-play offices, and independent commercial office properties across Bengaluru with expert shortlisting and leasing support.",
  path: "/we-help",
  keywords:
    "coworking spaces in Bengaluru, managed offices in Bengaluru, plug-and-play offices in Bengaluru, independent commercial office properties, office space for rent in Bangalore, commercial office space Bengaluru, startup office space Bangalore, business office space Bengaluru, flexible workspace Bangalore, ready to move office space, private office space Bangalore, workspace consultant Bengaluru",
});

export default function WeHelpPage() {
  return (
    <RouteShell pathname="/we-help">
      <WeHelp />
    </RouteShell>
  );
}
