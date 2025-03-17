/**
 * Default breakpoints used for responsive design.
 * The breakpoints define the minimum width for each screen size.
 */
export const defaultBreakpoints = {
  sm: 576, // Small devices (phones, 576px and up)
  md: 768, // Medium devices (tablets, 768px and up)
  lg: 1024, // Large devices (desktops, 1024px and up)
  xl: 1200, // Extra large devices (large desktops, 1200px and up)
};

/**
 * Creates a runtime media query system by injecting a style tag into the document.
 * This function dynamically generates CSS rules for various breakpoints based on the provided default breakpoints.
 * It applies these rules to elements based on the custom CSS properties we define.
 */
export function createMediaQueryRuntime() {
  // Skip if not in a browser environment
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  // Prevent re-initialization if the media queries are already injected
  if (document.getElementById("bloxi-media-queries")) {
    return;
  }

  // Create a <style> element to hold the media queries and custom CSS
  const style = document.createElement("style");
  style.id = "bloxi-media-queries"; // Set the ID to easily identify and modify the style tag

  // Initialize the base CSS string for the custom properties
  let css = `
    /* Bloxi Media Query Runtime */
    [style*="--bx-mq"] {
      /* Default: Apply base values */
    }
  `;

  // Iterate over each breakpoint and generate the media query styles
  Object.entries(defaultBreakpoints).forEach(([breakpoint, minWidth]) => {
    // Add media query for each breakpoint
    css += `
    @media (min-width: ${minWidth}px) {
      [style*="--bx-mq-${breakpoint}"] {
        /* Apply styles for breakpoints */
      }
    `;

    // List of supported CSS properties that need to be applied within the media query
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

    // Generate CSS rules for each supported property
    cssProperties.forEach((prop) => {
      // Convert kebab-case to camelCase for JS compatibility
      const jsName = prop.replace(/-([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );

      // Generate CSS rule for the current property in the given breakpoint
      css += `
      [style*="--bx-mq-${breakpoint}-${jsName}"] {
        ${prop}: var(--bx-mq-${breakpoint}-${jsName});
      }
      `;
    });

    // Close the media query block
    css += `}`;
  });

  // Set the CSS content and append the style element to the document's head
  style.textContent = css;
  document.head.appendChild(style);
}

/**
 * Initializes the media query runtime system.
 * This function ensures that the media query runtime is initialized once the DOM content is fully loaded.
 * If the DOM is already loaded, it will immediately run the media query creation.
 */
export function initMediaQueryRuntime() {
  // Ensure the function is only executed in the browser environment
  if (typeof window !== "undefined") {
    // Check if the document is still loading, then add an event listener for DOMContentLoaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", createMediaQueryRuntime);
    } else {
      // If the DOM is already loaded, initialize the media queries immediately
      createMediaQueryRuntime();
    }
  }
}
