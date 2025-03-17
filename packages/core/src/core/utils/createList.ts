import React from "react";
import { createElement } from "../createElement";

/**
 * Helper function to create a list of elements with proper keys.
 * This function is used to render a list of items with unique keys, which is essential for efficient React rendering.
 *
 * @param items - Array of items to render.
 * @param renderItem - Function that renders an item.
 * @param getKey - Function that extracts a unique key from an item (optional). Defaults to using the index.
 * @returns An array of React elements with keys.
 *
 * @example
 * const listItems = [1, 2, 3];
 * const renderedItems = createList(listItems, (item) => <div>{item}</div>);
 * // Output: Array of div elements with keys
 */
export function createList<T>(
  items: T[],
  renderItem: (item: T, index: number) => React.ReactNode,
  getKey: (item: T, index: number) => string | number = (_, index) => index
): React.ReactNode[] {
  return items.map((item, index) => {
    const element = renderItem(item, index);

    // Return the element as-is if it's already a valid React element
    if (!React.isValidElement(element)) {
      return element;
    }

    // If the element already has a key, use it
    if (element.key != null) {
      return element;
    }

    // Otherwise, clone the element with a generated key
    const key = getKey(item, index);
    return React.cloneElement(element, { key });
  });
}

/**
 * Create a container element with children that have unique keys.
 * This function is useful when you need a wrapper container around a list of elements
 * where each child is properly keyed.
 *
 * @param containerType - The type of the container element (e.g., 'div', 'section', etc.).
 * @param containerProps - The props to apply to the container element.
 * @param items - Array of items to render.
 * @param renderItem - Function that renders an item.
 * @param getKey - Function that extracts a unique key from an item (optional). Defaults to using the index.
 * @returns A container element with keyed children.
 *
 * @example
 * const listItems = [1, 2, 3];
 * const container = createContainer('div', { className: 'container' }, listItems, (item) => <div>{item}</div>);
 * // Output: <div class="container">[<div key="0">1</div>, <div key="1">2</div>, <div key="2">3</div>]</div>
 */
export function createContainer<T, P extends object>(
  containerType: React.ElementType<P>,
  containerProps: P,
  items: T[],
  renderItem: (item: T, index: number) => React.ReactNode,
  getKey: (item: T, index: number) => string | number = (_, index) => index
): React.ReactNode {
  const children = createList(items, renderItem, getKey);
  return createElement(containerType, { ...containerProps, children });
}

/**
 * A convenient utility to map over items and render them inside a Bloxi component.
 * This is essentially a shorthand for using `createList`, designed to be more intuitive and easy to use
 * within a Bloxi-style component.
 *
 * @param items - Array of items to render.
 * @param renderItem - Function that renders an item.
 * @param getKey - Function that extracts a unique key from an item (optional). Defaults to using the index.
 * @returns An array of React elements with keys.
 *
 * @example
 * const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * const userItems = mapItems(users, (user) => <Text>{user.name}</Text>, (user) => user.id);
 * // Output: Array of Text components, each with a unique key based on user.id
 */
export function mapItems<T>(
  items: T[],
  renderItem: (item: T, index: number) => React.ReactNode,
  getKey: (item: T, index: number) => string | number = (_, index) => index
): React.ReactNode[] {
  return createList(items, renderItem, getKey);
}
