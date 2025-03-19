/**
 * Custom declarations for Wouter components to properly integrate with Bloxi
 */
declare module "wouter" {
  import { ReactNode, ComponentType, FunctionComponent } from "react";

  export interface SwitchProps {
    location?: string;
    children: ReactNode;
  }

  export interface RouteProps {
    path?: string | RegExp;
    nest?: boolean;
    children?: ReactNode | ((params: any) => ReactNode);
  }

  export interface LinkProps {
    href: string;
    children?: ReactNode;
    replace?: boolean;
    state?: any;
    onClick?: (event: any) => void;
    [key: string]: any;
  }

  export interface RedirectProps {
    to: string;
    replace?: boolean;
    state?: any;
  }

  export interface RouterProps {
    base?: string;
    hook?: any;
    children?: ReactNode;
    [key: string]: any;
  }

  // Declare components as any to bypass type checking
  export const Switch: any;
  export const Route: any;
  export const Link: any;
  export const Redirect: any;
  export const Router: any;

  // Hooks retain their original types
  export function useRoute(
    pattern: string | RegExp
  ): [boolean, Record<string, string> | null];
  export function useLocation(): [
    string,
    (to: string, options?: { replace?: boolean; state?: any }) => void,
  ];
  export function useParams(): Record<string, string>;
  export function useRouter(): any;
}

declare module "wouter/use-browser-location" {
  export function useBrowserLocation(): [
    string,
    (to: string, options?: { replace?: boolean; state?: any }) => void,
  ];
}

declare module "wouter/use-hash-location" {
  export function useHashLocation(): [
    string,
    (to: string, options?: { replace?: boolean }) => void,
  ];
}

declare module "wouter/memory-location" {
  export interface MemoryLocationOptions {
    path?: string;
    static?: boolean;
    record?: boolean;
  }

  export function memoryLocation(options?: MemoryLocationOptions): {
    hook: () => [string, (to: string, options?: any) => void];
    history: string[];
    navigate: (to: string) => void;
  };
}
