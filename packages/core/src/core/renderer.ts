import { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";
import { createElement } from "./createElement";
import { ErrorBoundary } from "./utils/errorBoundary";

// Map to store root instances for multiple containers
const rootInstances = new Map<HTMLElement, Root>();

/**
 * Renders a component to the DOM.
 * If a root already exists in the container, it uses the existing root instance to render the component.
 * If no root exists, it creates a new root and associates it with the container.
 * Wraps the component inside an `ErrorBoundary` to catch any rendering errors.
 *
 * @param component The React element or node to render.
 * @param container The container (HTML element) to render the component into.
 */
export function render(
  component: React.ReactElement | React.ReactNode,
  container: HTMLElement
): void {
  let root = rootInstances.get(container);

  if (!root) {
    root = createRoot(container);
    rootInstances.set(container, root);
  }

  // Wrap the component in ErrorBoundary
  root.render(
    createElement(
      StrictMode,
      {},
      createElement(
        ErrorBoundary,
        {
          children: JSON.stringify({ children: component }),
        },
        component
      )
    )
  );
}

/**
 * Renders a component to the DOM element with the given root ID.
 * If the element with the specified root ID is not found, an error is thrown.
 * This function calls `render` to render the component in the found container.
 *
 * @param component The React element or node to render.
 * @param rootId The ID of the root HTML element to render the component into (defaults to "root").
 * @throws Error If the root element with the specified ID is not found.
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
 * Creates an app instance that can mount and unmount components to/from specific containers.
 * The app instance manages the rendering of components, optionally with `StrictMode`, and ensures that errors are caught via `ErrorBoundary`.
 *
 * @param options Options to customize the app behavior.
 * - `strict`: A boolean indicating whether to use React's StrictMode for rendering (defaults to `true`).
 *
 * @returns An object with `mount` and `unmount` methods to manage component rendering.
 */
export function createApp(options: { strict?: boolean } = {}) {
  const { strict = true } = options;

  return {
    /**
     * Mounts a component to a specified container element.
     * If the container is provided as a string, it attempts to find the element using `document.querySelector`.
     * Wraps the component inside an `ErrorBoundary` to catch any rendering errors.
     *
     * @param component The React element or node to render.
     * @param container The container (HTML element or selector string) to mount the component into.
     * @throws Error If the container element is not found.
     */
    mount({
      component,
      container,
    }: {
      component: React.ReactElement | React.ReactNode;
      container: HTMLElement | string;
    }): void {
      const targetElement =
        typeof container === "string"
          ? (document.querySelector(container) as HTMLElement | null)
          : container;

      if (!targetElement) {
        throw new Error(`Target element not found: ${container}`);
      }

      let root = rootInstances.get(targetElement);

      if (!root) {
        root = createRoot(targetElement);
        rootInstances.set(targetElement, root);
      }

      // Wrap the component in ErrorBoundary and render with optional StrictMode
      if (strict) {
        root.render(
          createElement(
            StrictMode,
            {},
            createElement(
              ErrorBoundary,
              {
                children: JSON.stringify({ children: component }),
              },
              component
            )
          )
        );
      } else {
        root.render(
          createElement(
            ErrorBoundary,
            {
              children: JSON.stringify({ children: component }),
            },
            component
          )
        );
      }
    },

    /**
     * Unmounts a component from the specified container element.
     * If the container is provided as a string, it attempts to find the element using `document.querySelector`.
     * Removes the root instance associated with the container element from the `rootInstances` map.
     *
     * @param container The container (HTML element or selector string) from which to unmount the component.
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
