import React, {
  useRef,
  useEffect,
  useState,
  ComponentType,
  ReactElement,
  ReactNode,
} from "react";

/**
 * Internal counter for unique keys
 */
let keyCounter = 0;

/**
 * Adds a key to React elements that need one
 */
function ensureElementKey(element: ReactNode, index: number): ReactNode {
  if (!React.isValidElement(element) || element.key != null) {
    return element;
  }

  return React.cloneElement(element, { key: `bloxi-${index}-${keyCounter++}` });
}

/**
 * Makes sure all children in an array have keys
 */
function processChildren(children: ReactNode): ReactNode {
  if (Array.isArray(children)) {
    return children.map((child, index) => ensureElementKey(child, index));
  }
  return children;
}

/**
 * Creates React elements with automatic key handling
 */
export function createElement<P extends object>(
  type: React.ElementType<P>,
  props?: P & { children?: ReactNode },
  ...children: ReactNode[]
): ReactElement {
  const finalProps = props || ({} as P);

  // Handle children and keys
  if (children && children.length > 0) {
    if (children.length === 1) {
      (finalProps as any).children = children[0];
    } else {
      (finalProps as any).children = children.map((child, index) =>
        ensureElementKey(child, index)
      );
    }
  } else if ((finalProps as any).children) {
    (finalProps as any).children = processChildren(
      (finalProps as any).children
    );
  }

  // Use ID or test ID as key if needed
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

/**
 * Creates a React component that can use hooks
 *
 * @param renderFn - A function that will be converted to a React component
 * @returns A function that creates React elements with the component
 *
 * @example
 * const Counter = hookable(props => {
 *   const [count, setCount] = useState(props.initial || 0);
 *   return HtmlDiv({
 *     children: [
 *       HtmlButton({ onClick: () => setCount(count + 1), children: "+" }),
 *       HtmlSpan({ children: count }),
 *       HtmlButton({ onClick: () => setCount(count - 1), children: "-" })
 *     ]
 *   });
 * });
 *
 * // Usage:
 * Counter({ initial: 5 })
 */
export function hookable<Props extends object, Result extends ReactNode>(
  renderFn: (props: Props) => Result
): (props?: Props) => ReactElement {
  // Create a proper React functional component that can use hooks
  const Component: React.FC<Props> = (props) => {
    return renderFn(props) as ReactElement;
  };

  // Set display name for debugging
  Component.displayName = renderFn.name || "BloxiComponent";

  // Return a function that creates React elements with this component
  return (props?: Props) => createElement(Component, props || ({} as Props));
}

// Re-export React hooks
export function useStore<T>(
  initialState: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
  return useState<T>(initialState);
}

export function useRun(
  effect: React.EffectCallback,
  deps?: React.DependencyList
): void {
  return useEffect(effect, deps);
}

export function useElem<T>(initialValue: T | null = null): React.RefObject<T> {
  return useRef<T | null>(initialValue) as React.RefObject<T>;
}

// For compatibility, re-export React hooks with their original names
export { useState, useEffect, useRef };
