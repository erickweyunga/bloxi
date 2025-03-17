import React from "react";

/**
 * Internal counter for generating unique keys
 */
let keyCounter = 0;

/**
 * Ensures a React element has a key. If the element doesn't already have a key,
 * it will generate one using a counter and the index in the parent collection.
 *
 * @param element - The React element that may need a key
 * @param index - The index of the element in a list (used for generating a unique key)
 * @returns The element with a key or the original element if it already has a key
 */
function ensureElementKey(
  element: React.ReactNode,
  index: number
): React.ReactNode {
  // Only process React elements
  if (!React.isValidElement(element)) {
    return element;
  }

  // If already has a key, return as is
  if (element.key != null) {
    return element;
  }

  // Clone with a generated key
  return React.cloneElement(element, { key: `bloxi-${index}-${keyCounter++}` });
}

/**
 * Processes children elements to ensure array items have keys. If the children are
 * in an array, each element is processed to ensure it has a key.
 *
 * @param children - The children to process (either a single element or an array)
 * @returns The children with keys assigned, or the original children if they do not need processing
 */
function processChildren(children: React.ReactNode): React.ReactNode {
  // If it's an array, ensure each element has a key
  if (Array.isArray(children)) {
    return children.map((child, index) => ensureElementKey(child, index));
  }

  // Otherwise, return as is
  return children;
}

/**
 * Bloxi's version of React.createElement with automatic key handling.
 * This function ensures that React elements, especially in lists, always have a unique key.
 * It can process both direct children and children passed via props.
 *
 * @param type - The type of the element to create (e.g., 'div', 'span', or a custom component)
 * @param props - The props to apply to the element (can include children and other props)
 * @param children - The children to be passed to the element (if any)
 * @returns A React element with proper key handling
 */
export function createElement<P extends object>(
  type: React.ElementType<P>,
  props?: P & { children?: React.ReactNode },
  ...children: React.ReactNode[]
): React.ReactElement {
  const finalProps = props || ({} as P);

  // Handle children with proper key management
  if (children && children.length > 0) {
    // Single child doesn't need a key
    if (children.length === 1) {
      (finalProps as any).children = children[0];
    } else {
      // Process multiple children for keys
      (finalProps as any).children = children.map((child, index) =>
        ensureElementKey(child, index)
      );
    }
  } else if ((finalProps as any).children) {
    // Also process children if provided in props
    (finalProps as any).children = processChildren(
      (finalProps as any).children
    );
  }

  // Apply key from common identifiers if not explicitly provided
  if (
    (finalProps as any).key == null &&
    ((finalProps as any).id ||
      (finalProps as any)["data-testid"] ||
      (finalProps as any)["data-id"])
  ) {
    (finalProps as any).key =
      (finalProps as any).id ||
      (finalProps as any)["data-testid"] ||
      (finalProps as any)["data-id"];
  }

  return React.createElement(type, finalProps);
}
