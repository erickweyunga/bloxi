import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";
import { createElement } from "./createElement";
import { ErrorBoundary } from "./utils/errorBoundary";

// Store root instances for multiple containers
const rootInstances = new Map<HTMLElement, Root>();

/**
 * Renders a component to the DOM
 *
 * Creates or reuses a root instance and renders the component with error handling
 */
export function render(
  component: React.ReactElement | React.ReactNode,
  container: HTMLElement
): void {
  // Get existing root or create new one
  let root = rootInstances.get(container);
  if (!root) {
    root = createRoot(container);
    rootInstances.set(container, root);
  }

  // Render with error boundary protection
  root.render(
    createElement(StrictMode, {}, createElement(ErrorBoundary, {}, component))
  );
}

/**
 * Renders a component to a root element by ID
 *
 * @example
 * // Renders to <div id="root"></div>
 * renderRoot(App());
 *
 * // Renders to <div id="custom-root"></div>
 * renderRoot(Dashboard(), "custom-root");
 */
export function renderRoot(
  component: React.ReactElement | React.ReactNode,
  rootId: string = "root"
): void {
  const rootElement = document.getElementById(rootId);

  if (!rootElement) {
    throw new Error(`Root element with id "${rootId}" not found`);
  }

  render(component, rootElement);
}

/**
 * Creates an app instance with mount/unmount methods
 *
 * Useful for managing multiple app instances or dynamic mounting
 *
 * @example
 * const app = createApp();
 *
 * // Mount to a container
 * app.mount({
 *   component: Dashboard(),
 *   container: "#dashboard-container"
 * });
 *
 * // Later unmount it
 * app.unmount("#dashboard-container");
 */
export function createApp(options: { strict?: boolean } = {}) {
  const { strict = true } = options;

  return {
    /**
     * Mounts a component to a container
     */
    mount({
      component,
      container,
    }: {
      component: React.ReactElement | React.ReactNode;
      container: HTMLElement | string;
    }): void {
      // Find the target element
      const targetElement =
        typeof container === "string"
          ? (document.querySelector(container) as HTMLElement | null)
          : container;

      if (!targetElement) {
        throw new Error(`Target element not found: ${container}`);
      }

      // Create or reuse root
      let root = rootInstances.get(targetElement);
      if (!root) {
        root = createRoot(targetElement);
        rootInstances.set(targetElement, root);
      }

      // Render with appropriate wrapping
      if (strict) {
        root.render(
          createElement(
            StrictMode,
            {},
            createElement(ErrorBoundary, {}, component)
          )
        );
      } else {
        root.render(createElement(ErrorBoundary, {}, component));
      }
    },

    /**
     * Unmounts a component from a container
     */
    unmount(container: HTMLElement | string) {
      const targetElement =
        typeof container === "string"
          ? (document.querySelector(container) as HTMLElement | null)
          : container;

      if (!targetElement) return;

      const root = rootInstances.get(targetElement);
      if (root) {
        root.unmount();
        rootInstances.delete(targetElement);
      }
    },
  };
}
