# @bloxi/router

A lightweight routing adapter for the Bloxi framework powered by [Wouter](https://github.com/molefrog/wouter).

## Features

- 🪶 **Lightweight**: Less than 1KB of additional code on top of Wouter (which is already tiny at ~2KB)
- 🧩 **Familiar API**: Consistent with Bloxi's function-based component style
- 🔄 **Flexible**: Supports nested routes, route parameters, and multiple location strategies
- 💪 **Typed**: Full TypeScript support for maximum developer experience

## Installation

```bash
# npm
npm install @bloxi/router

# yarn
yarn add @bloxi/router

# pnpm
pnpm add @bloxi/router
```

## Basic Usage

```typescript
// main.ts
import { renderRoot } from "@bloxi/core";
import RootLayout from "./pages/Layout";

renderRoot(RootLayout());

// pages/Layout.ts
import { SwitchRoutes, Route } from "@bloxi/router";
import Home from "./pages/Home";
import About from "./pages/About";

export default function RootLayout() {
  return SwitchRoutes({
    component: [
      Route({
        path: "/",
        component: Home(),
      }),
      Route({
        path: "/about/:name",
        component: (params) => About({ name: params.name }),
      }),
    ],
  });
}

// pages/Home.ts
import { Link } from "@bloxi/router";
import { HtmlDiv, HtmlH1 } from "@bloxi/core";

export default function Home() {
  return HtmlDiv({
    children: [
      HtmlH1({ children: "Home Page" }),
      Link({ href: "/about/world", children: "About" }),
    ],
  });
}

// pages/About.ts
import { useLocation } from "@bloxi/router";
import { HtmlDiv, HtmlH1, HtmlButton } from "@bloxi/core";

export default function About({ name }) {
  const [location, navigate] = useLocation();

  return HtmlDiv({
    children: [
      HtmlH1({ children: `Hello ${name}!` }),
      HtmlButton({
        onClick: () => navigate("/"),
        children: "Go Home",
      }),
    ],
  });
}
```

## API Reference

### Components

#### `SwitchRoutes({ component, location })`

Renders the first matching route from its children.

```typescript
SwitchRoutes({
  component: [
    Route({ path: "/", component: Home() }),
    Route({ path: "/about", component: About() }),
    // Fallback route for 404
    Route({ path: "*", component: NotFound() }),
  ],
});
```

#### `Route({ path, component, nest })`

Conditionally renders content when the current location matches the specified path.

```typescript
Route({
  path: "/users/:id",
  component: (params) => UserProfile({ id: params.id }),
});

// Nested routes
Route({
  path: "/dashboard",
  nest: true,
  component: Dashboard(),
});
```

#### `Link({ href, children, ...props })`

Creates a navigation link that updates the location without a page reload.

```typescript
Link({
  href: "/about",
  children: "About Us",
  className: "nav-link",
});
```

#### `Redirect({ to, replace, state })`

Performs an immediate navigation when rendered.

```typescript
Redirect({ to: "/login" });

// With replace option
Redirect({ to: "/home", replace: true });
```

#### `Router({ hook, base, children, ...props })`

Optional top-level component for router configuration.

```typescript
// Hash-based routing
Router({
  hook: useHashLocation,
  children: App(),
});

// With base path
Router({
  base: "/app",
  children: App(),
});
```

### Hooks

#### `useLocation()`

Returns the current location and a navigate function.

```typescript
const [location, navigate] = useLocation();

// Log current location
console.log(location); // e.g., "/users/123"

// Navigate programmatically
navigate("/about");

// Replace current history entry
navigate("/login", { replace: true });

// With state
navigate("/dashboard", { state: { from: "home" } });
```

#### `useRoute(pattern)`

Checks if the current location matches a pattern and returns matched parameters.

```typescript
const [isMatch, params] = useRoute("/users/:id");

if (isMatch) {
  console.log(params.id); // e.g., "123"
}
```

#### `useParams()`

Returns parameters extracted from the matching route.

```typescript
// Inside a component rendered by a '/users/:id' route
const params = useParams();
console.log(params.id); // e.g., "123"
```

#### `useRouter()`

Returns the router configuration.

```typescript
const router = useRouter();
console.log(router.base); // Base path
```

### Location Strategies

#### `useBrowserLocation`

Default strategy that uses the browser's history API.

#### `useHashLocation`

Hash-based routing strategy that works with static hosting.

```typescript
import { Router, useHashLocation } from "@bloxi/router";

Router({
  hook: useHashLocation,
  children: App(),
});
```

#### `memoryLocation`

In-memory location hook useful for testing.

```typescript
import { Router, memoryLocation } from "@bloxi/router";

// For testing
const { hook } = memoryLocation({ path: "/users/123" });

Router({
  hook,
  children: App(),
});
```

## Advanced Usage

### Creating an Active Link Component

```typescript
import { Link, useRoute } from "@bloxi/router";
import { HtmlDiv } from "@bloxi/core";

export default function ActiveLink({ href, children, activeClass = "active" }) {
  const [isActive] = useRoute(href);

  return Link({
    href,
    className: isActive ? activeClass : "",
    children,
  });
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
