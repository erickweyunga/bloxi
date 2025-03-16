import { defaultBreakpoints } from "./utils/responsive";

/**
 * Creates stylesheet to handle media queries
 * This is a runtime approach that injects a stylesheet to handle the CSS variables
 * we generated in the responsive system
 */
export function createMediaQueryRuntime() {
  // Skip if not in browser environment
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  // Check if already initialized
  if (document.getElementById("bloxi-media-queries")) {
    return;
  }

  // Create stylesheet
  const style = document.createElement("style");
  style.id = "bloxi-media-queries";

  let css = `
    /* Bloxi Media Query Runtime */
    [style*="--bx-mq"] {
      /* Default: Apply base values */
    }
  `;

  // Generate media queries for each breakpoint
  Object.entries(defaultBreakpoints).forEach(([breakpoint, minWidth]) => {
    css += `
    @media (min-width: ${minWidth}px) {
      [style*="--bx-mq-${breakpoint}"] {
        /* Apply styles for breakpoints */
      }
    `;

    // General styles that apply the custom property values
    // For each CSS property we support
    const cssProperties = [
      "width",
      "height",
      "padding",
      "margin",
      "display",
      "flex-direction",
      "justify-content",
      "align-items",
      "gap",
      "grid-template-columns",
      "color",
      "background-color",
      "font-size",
      "text-align",
    ];

    cssProperties.forEach((prop) => {
      const jsName = prop.replace(/-([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      css += `
      [style*="--bx-mq-${breakpoint}-${jsName}"] {
        ${prop}: var(--bx-mq-${breakpoint}-${jsName});
      }
      `;
    });

    css += `
    }
    `;
  });

  style.textContent = css;
  document.head.appendChild(style);
}

/**
 * Initialize the media query runtime when in browser environment
 */
export function initMediaQueryRuntime() {
  if (typeof window !== "undefined") {
    // Run after DOM is loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", createMediaQueryRuntime);
    } else {
      createMediaQueryRuntime();
    }
  }
}
