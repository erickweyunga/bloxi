/**
 * Hash-based routing example
 *
 * This example demonstrates how to use hash-based routing with @bloxi/router.
 * This is useful for static hosting where server-side routing is not available.
 */
import { renderRoot } from "@bloxi/core";
import { SwitchRoutes, Route, Link, Router, useHashLocation } from "../src";
import { HtmlDiv, HtmlH1, HtmlP } from "@bloxi/core";

// Home page component
function Home() {
  return HtmlDiv({
    className: "page",
    children: [
      HtmlH1({ children: "Home Page" }),
      HtmlP({ children: "Using hash-based routing (#)" }),
      Link({ href: "/about", children: "About Us" }),
    ],
  });
}

// About page component
function About() {
  return HtmlDiv({
    className: "page",
    children: [
      HtmlH1({ children: "About Us" }),
      HtmlP({ children: "This page has a hash-based URL" }),
      Link({ href: "/", children: "Back to Home" }),
    ],
  });
}

// Root layout with routes
function App() {
  return SwitchRoutes({
    component: [
      Route({
        path: "/",
        component: Home(),
      }),
      Route({
        path: "/about",
        component: About(),
      }),
    ],
  });
}

// Render the application with hash-based routing
renderRoot(
  Router({
    hook: useHashLocation,
    children: App(),
  })
);

/**
 * With this setup:
 * - The home page URL will be: /#/
 * - The about page URL will be: /#/about
 */
