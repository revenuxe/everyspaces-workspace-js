"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface NavigationProgressContextValue {
  isNavigating: boolean;
  startNavigation: (target?: string) => void;
}

const NavigationProgressContext = createContext<NavigationProgressContextValue>({
  isNavigating: false,
  startNavigation: () => undefined,
});

const MIN_VISIBLE_MS = 420;

function NavigationLoader({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[120] transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="nav-loader-bar" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(228,142,53,0.18),transparent_40%),linear-gradient(180deg,rgba(8,75,92,0.12),rgba(8,75,92,0))]" />
      <div className="absolute inset-x-0 top-0 flex justify-center pt-6 sm:pt-8">
        <div className="nav-loader-shell">
          <div className="nav-loader-orbit">
            <span className="nav-loader-dot nav-loader-dot-a" />
            <span className="nav-loader-dot nav-loader-dot-b" />
            <span className="nav-loader-core" />
          </div>
          <div className="nav-loader-copy">
            <span>EverySpaces</span>
            <span>Curating your next workspace</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NavigationProgressProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const startedAtRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const clearPendingTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startNavigation = useCallback((target?: string) => {
    if (target && typeof window !== "undefined") {
      const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const targetUrl = new URL(target, window.location.origin);

      if (`${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}` === currentUrl) {
        return;
      }
    }

    clearPendingTimer();
    startedAtRef.current = performance.now();
    setIsNavigating(true);
  }, [clearPendingTimer]);

  const finishNavigation = useCallback(() => {
    const startedAt = startedAtRef.current;
    if (startedAt === null) {
      setIsNavigating(false);
      return;
    }

    const elapsed = performance.now() - startedAt;
    const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);

    clearPendingTimer();
    timeoutRef.current = window.setTimeout(() => {
      setIsNavigating(false);
      startedAtRef.current = null;
      timeoutRef.current = null;
    }, remaining);
  }, [clearPendingTimer]);

  useEffect(() => {
    finishNavigation();
  }, [pathname, searchParams, finishNavigation]);

  useEffect(() => {
    const handlePopState = () => {
      startNavigation();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      clearPendingTimer();
    };
  }, [clearPendingTimer, startNavigation]);

  const value = useMemo(
    () => ({
      isNavigating,
      startNavigation,
    }),
    [isNavigating, startNavigation],
  );

  return (
    <NavigationProgressContext.Provider value={value}>
      <NavigationLoader active={isNavigating} />
      {children}
    </NavigationProgressContext.Provider>
  );
}

export function useNavigationProgress() {
  return useContext(NavigationProgressContext);
}
