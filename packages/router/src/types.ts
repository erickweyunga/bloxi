/**
 * Type definitions for @bloxi/router package
 */
import { ReactNode } from "react";

/**
 * Router component props
 */
export interface RouterProps {
  /** Location hook to use */
  hook?: any;
  /** Base path for all routes */
  base?: string;
  /** Children to render */
  children: ReactNode;
  /** Any additional props for the Wouter Router */
  [key: string]: any;
}

/**
 * Route component props
 */
export interface RouteProps {
  /** Path pattern to match */
  path: string | RegExp;
  /** Component to render when path matches */
  component: any;
  /** Enable route nesting */
  nest?: boolean;
}

/**
 * SwitchRoutes component props
 */
export interface SwitchRoutesProps {
  /** Child routes */
  component: ReactNode;
  /** Optional location override */
  location?: string;
}

/**
 * Link component props
 */
export interface LinkProps {
  /** Target URL */
  href: string;
  /** Link content */
  children: ReactNode;
  /** Replace current history entry instead of pushing a new one */
  replace?: boolean;
  /** State object for history API */
  state?: any;
  /** Additional props for the anchor element */
  [key: string]: any;
}

/**
 * Redirect component props
 */
export interface RedirectProps {
  /** Target URL */
  to: string;
  /** Replace current history entry instead of pushing a new one */
  replace?: boolean;
  /** State object for history API */
  state?: any;
}

/**
 * Navigation options
 */
export interface NavigateOptions {
  /** Replace current history entry instead of pushing a new one */
  replace?: boolean;
  /** State object for history API */
  state?: any;
}
