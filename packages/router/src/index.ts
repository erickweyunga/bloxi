/**
 * @bloxi/router - A lightweight adapter for Wouter with Bloxi framework
 *
 * This package provides integration between Wouter router and Bloxi's function-based API.
 */
export {
  Router,
  Route,
  SwitchRoutes,
  Link,
  Redirect,
  useLocation,
  useRoute,
  useParams,
  useRouter,
  LocationDisplay,
  ActiveLink,
} from "./utils";
export { useBrowserLocation } from "wouter/use-browser-location";
export { useHashLocation } from "wouter/use-hash-location";
export { memoryLocation } from "wouter/memory-location";
export type {
  RouterProps,
  RouteProps,
  SwitchRoutesProps,
  LinkProps,
  RedirectProps,
} from "./types";
