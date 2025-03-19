/**
 * Nested routes example
 *
 * This example demonstrates how to use nested routes with @bloxi/router.
 */
import { renderRoot } from "@bloxi/core";
import { SwitchRoutes, Route, Link, Router } from "../src";
import { HtmlDiv, HtmlH1, HtmlH2, HtmlNav, HtmlMain } from "@bloxi/core";

// Dashboard layout component
function Dashboard() {
  return HtmlDiv({
    className: "dashboard",
    children: [
      HtmlH1({ children: "Dashboard" }),
      HtmlNav({
        className: "dashboard-nav",
        children: [
          Link({ href: "/dashboard/profile", children: "Profile" }),
          Link({ href: "/dashboard/settings", children: "Settings" }),
          Link({ href: "/", children: "Home" }),
        ],
      }),
      HtmlMain({
        className: "dashboard-content",
        children: "Select an option from the menu",
      }),
    ],
  });
}

// Profile page component
function Profile() {
  return HtmlDiv({
    className: "page",
    children: [
      HtmlH2({ children: "User Profile" }),
      HtmlDiv({ children: "Edit your profile information here" }),
    ],
  });
}

// Settings page component
function Settings() {
  return HtmlDiv({
    className: "page",
    children: [
      HtmlH2({ children: "Settings" }),
      HtmlDiv({ children: "Configure your account settings" }),
    ],
  });
}

// Home page component
function Home() {
  return HtmlDiv({
    className: "page",
    children: [
      HtmlH1({ children: "Home" }),
      Link({ href: "/dashboard", children: "Go to Dashboard" }),
    ],
  });
}

// Root layout with routes
function App() {
  return Router({
    children: SwitchRoutes({
      component: [
        Route({
          path: "/",
          component: Home(),
        }),

        // Nested routes
        Route({
          path: "/dashboard",
          nest: true, // Enable nesting
          component: Dashboard(),
        }),

        // Child routes
        Route({
          path: "/dashboard/profile",
          component: Profile(),
        }),

        Route({
          path: "/dashboard/settings",
          component: Settings(),
        }),
      ],
    }),
  });
}

// Render the application
renderRoot(App());
