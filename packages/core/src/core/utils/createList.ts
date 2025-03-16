import React from "react";
import { createElement } from "../createElement";

/**
 * Helper function to create a list of elements with proper keys
 * @param items Array of items to render
 * @param renderItem Function that renders an item
 * @param getKey Function that extracts a unique key from an item
 * @returns Array of React elements with keys
 */
export function createList<T>(
  items: T[],
  renderItem: (item: T, index: number) => React.ReactNode,
  getKey: (item: T, index: number) => string | number = (_, index) => index
): React.ReactNode[] {
  return items.map((item, index) => {
    const element = renderItem(item, index);

    if (!React.isValidElement(element)) {
      return element;
    }

    // If element already has a key, use it
    if (element.key != null) {
      return element;
    }

    // Clone with a key
    const key = getKey(item, index);
    return React.cloneElement(element, { key });
  });
}

/**
 * Create a container with keyed children
 * @param containerType The container element type
 * @param containerProps Props for the container
 * @param items Array of items to render
 * @param renderItem Function that renders an item
 * @param getKey Function that extracts a unique key from an item
 * @returns A container element with keyed children
 */
export function createContainer<T, P extends object>(
  containerType: React.ElementType<P>,
  containerProps: P,
  items: T[],
  renderItem: (item: T, index: number) => React.ReactNode,
  getKey: (item: T, index: number) => string | number = (_, index) => index
): React.ReactElement {
  const children = createList(items, renderItem, getKey);
  return createElement(containerType, { ...containerProps, children });
}

/**
 * A more convenient way to render lists within a Bloxi component
 *
 * Example usage:
 *
 * Box({
 *   ...
 *   children: mapItems(users, user => Text({
 *     children: user.name
 *   }), user => user.id)
 * })
 */
export function mapItems<T>(
  items: T[],
  renderItem: (item: T, index: number) => React.ReactNode,
  getKey: (item: T, index: number) => string | number = (_, index) => index
): React.ReactNode[] {
  return createList(items, renderItem, getKey);
}
