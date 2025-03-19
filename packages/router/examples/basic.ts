/**
 * Basic routing example
 *
 * This example demonstrates the basic routing setup with @bloxi/router.
 */
import { renderRoot } from "@bloxi/core";
import { SwitchRoutes, Route, Link } from "../src";
import { HtmlDiv, HtmlH1, HtmlP } from "@bloxi/core";

// Home page component
function Home() {
  return HtmlDiv({
    className: "page",
    children: [
      HtmlH1({ children: "Home Page" }),
      HtmlP({ children: "Welcome to our website" }),
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
      HtmlP({ children: "We are a Bloxi-powered website" }),
      Link({ href: "/", children: "Back to Home" }),
    ],
  });
}

// Not found page component
function NotFound() {
  return HtmlDiv({
    className: "page not-found",
    children: [
      HtmlH1({ children: "404 - Page Not Found" }),
      HtmlP({ children: "The page you are looking for does not exist" }),
      Link({ href: "/", children: "Go Home" }),
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
      // Fallback route for 404
      Route({
        path: "*",
        component: NotFound(),
      }),
    ],
  });
}

// Render the application
renderRoot(App());
