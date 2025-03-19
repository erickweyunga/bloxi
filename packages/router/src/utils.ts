/**
 * Core implementation of Wouter adapter for Bloxi
 */
import { createElement } from "@bloxi/core";
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

/**
 * SwitchRoutes component for exclusive routing
 *
 * Only renders the first matching route among its children.
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
 * Hook for matching the current location against a pattern
 */
export function useRoute(pattern: string | RegExp) {
  return wUseRoute(pattern);
}

/**
 * Hook for accessing and manipulating the current location
 */
export function useLocation() {
  return wUseLocation();
}

/**
 * Hook for accessing route parameters
 */
export function useParams() {
  return wUseParams();
}

/**
 * Hook for accessing the router configuration
 */
export function useRouter() {
  return wUseRouter();
}
