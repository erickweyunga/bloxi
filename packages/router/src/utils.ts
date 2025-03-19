import { createElement, hookable } from "@bloxi/core";
import {
  Redirect as WRedirect,
  Route as WRoute,
  Switch,
  Link as WLink,
  useRoute as wUseRoute,
  useLocation as wUseLocation,
  useParams as wUseParams,
  Router as WRouter,
  useRouter as wUseRouter,
} from "wouter";
import {
  RouterProps,
  RouteProps,
  SwitchRoutesProps,
  LinkProps,
  RedirectProps,
} from "./types";
import { ReactNode } from "react";

/**
 * SwitchRoutes component for exclusive routing
 */
export function SwitchRoutes({ component, location }: SwitchRoutesProps) {
  return createElement(Switch, {
    location,
    children: component,
  });
}

/**
 * Route component for conditional rendering based on URL pattern
 */
export function Route({ path, component, nest }: RouteProps) {
  return createElement(WRoute, { path, nest }, component);
}

/**
 * Redirect component for navigation on mount
 */
export function Redirect({ to, replace = true, state }: RedirectProps) {
  return createElement(WRedirect, { to, replace, state });
}

/**
 * Link component for client-side navigation
 */
export function Link({
  href,
  children,
  replace = false,
  state,
  ...props
}: LinkProps) {
  return createElement(WLink, { href, replace, state, ...props }, children);
}

/**
 * Router component for configuration
 */
export function Router({ hook, base, children, ...props }: RouterProps) {
  return createElement(WRouter, { hook, base, ...props }, children);
}

/**
 * Hook-enabled components
 */

// Props for ActiveLink component
interface ActiveLinkProps extends Omit<LinkProps, "className"> {
  className?: string;
  activeClassName?: string;
}

// ActiveLink component that highlights when route matches
export const ActiveLink = hookable<ActiveLinkProps, ReactNode>(
  (props: { [x: string]: any; href: any; children: any; className?: "" | undefined; activeClassName?: "active" | undefined; }) => {
    const {
      href,
      children,
      className = "",
      activeClassName = "active",
      ...rest
    } = props;

    // Now hooks are used inside a proper React functional component
    const [isActive] = wUseRoute(href);

    const finalClassName = isActive
      ? `${className} ${activeClassName}`.trim()
      : className;

    return createElement(WLink, {
      href,
      className: finalClassName,
      ...rest,
      children,
    });
  }
);

// Props for LocationDisplay component
interface LocationDisplayProps {
  children?: ReactNode;
  format?: (location: string) => string | undefined;
}

// LocationDisplay component that shows current location
export const LocationDisplay = hookable<LocationDisplayProps, ReactNode>(
  (props: { children: any; format: any; }) => {
    const { children, format } = props;

    // Now hooks are used inside a proper React functional component
    const [location] = wUseLocation();

    const displayText = format
      ? format(location)
      : `Current location: ${location}`;

    return createElement("div", {
      children: children || displayText,
    });
  }
);

/**
 * Custom hook wrappers - to be used only inside proper React components
 */
export function useRoute(
  pattern: string | RegExp
): [boolean, Record<string, string> | null] {
  return wUseRoute(pattern);
}

export function useLocation(): [
  string,
  (to: string, options?: { replace?: boolean; state?: any }) => void,
] {
  return wUseLocation();
}

export function useParams<
  T extends Record<string, string> = Record<string, string>,
>(): T {
  return wUseParams() as T;
}

export function useRouter(): { base: string } {
  return wUseRouter();
}
