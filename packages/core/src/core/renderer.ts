import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createElement } from "./createElement";

/**
 * Renders a component to the DOM
 */
export function render(
  component: React.ReactElement,
  container: HTMLElement
): void {
  createRoot(container).render(createElement(StrictMode, {}, component));
}

/**
 * Renders a component to the root element
 */
export function renderRoot(
  component: React.ReactElement,
  rootId: string = "root"
): void {
  const rootElement = document.getElementById(rootId);

  if (!rootElement) {
    throw new Error(`Root element with id "${rootId}" not found`);
  }

  render(component, rootElement);
}

/**
 * Creates an app instance
 */
export function createApp(options: { strict?: boolean } = {}) {
  const { strict = true } = options;

  return {
    mount(
      component: React.ReactElement,
      container: HTMLElement | string
    ): void {
      const targetElement =
        typeof container === "string"
          ? (document.querySelector(container) as HTMLElement)
          : container;

      if (!targetElement) {
        throw new Error(`Target element not found: ${container}`);
      }

      if (strict) {
        createRoot(targetElement).render(
          createElement(StrictMode, {}, component)
        );
      } else {
        createRoot(targetElement).render(component);
      }
    },
  };
}
