"use client";

import type { ReactNode } from "react";
import { RouteCompatProvider } from "@/compat/react-router-dom";

export function RouteShell({
  children,
  pathname,
  params,
}: {
  children: ReactNode;
  pathname: string;
  params?: Record<string, string | string[] | undefined>;
}) {
  return (
    <RouteCompatProvider pathname={pathname} params={params}>
      {children}
    </RouteCompatProvider>
  );
}
