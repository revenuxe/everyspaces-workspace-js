"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, type ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useState } from "react";
import { NavigationProgressProvider } from "@/components/NavigationProgress";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      }>
        <NavigationProgressProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {children}
          </TooltipProvider>
        </NavigationProgressProvider>
      </Suspense>
    </QueryClientProvider>
  );
}
