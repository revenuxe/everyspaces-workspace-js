"use client";

import NextLink from "next/link";
import { useParams as useNextParams, usePathname, useRouter } from "next/navigation";
import { createContext, forwardRef, useContext, type AnchorHTMLAttributes, type ReactNode } from "react";
import { useNavigationProgress } from "@/components/NavigationProgress";

interface RouteContextValue {
  pathname?: string;
  params?: Record<string, string | string[] | undefined>;
}

const RouteContext = createContext<RouteContextValue>({});

export function RouteCompatProvider({
  children,
  pathname,
  params,
}: {
  children: ReactNode;
  pathname?: string;
  params?: Record<string, string | string[] | undefined>;
}) {
  return <RouteContext.Provider value={{ pathname, params }}>{children}</RouteContext.Provider>;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  replace?: boolean;
  prefetch?: boolean;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function CompatLink(
  { to, replace, prefetch, children, ...props },
  ref,
) {
  const { startNavigation } = useNavigationProgress();

  return (
    <NextLink
      href={to}
      replace={replace}
      prefetch={prefetch}
      ref={ref}
      {...props}
      onClick={(event) => {
        props.onClick?.(event);

        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          props.target === "_blank" ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        startNavigation(to);
      }}
    >
      {children}
    </NextLink>
  );
});

export const NavLink = Link;

export function useNavigate() {
  const router = useRouter();
  const { startNavigation } = useNavigationProgress();

  return (to: string) => {
    startNavigation(to);
    router.push(to);
  };
}

export function useParams<T extends Record<string, string | undefined>>() {
  const nextParams = useNextParams();
  const context = useContext(RouteContext);
  const params = context.params || (nextParams as Record<string, string | string[] | undefined>);
  return params as T;
}

export function useLocation() {
  const pathname = usePathname();
  const context = useContext(RouteContext);
  return {
    pathname: context.pathname || pathname || "/",
  };
}
