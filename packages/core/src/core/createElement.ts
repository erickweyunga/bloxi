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
 * Symbol marking hook-enabled components
 */
const USES_HOOKS = Symbol("uses_hooks");

/**
 * Type for hook-enabled components
 */
type HooksComponent<P = any> = Function & { [USES_HOOKS]?: boolean };

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
 * Marks a function as hook-enabled
 */
export function withHooks<T extends Function>(componentFn: T): T {
  (componentFn as HooksComponent)[USES_HOOKS] = true;
  return componentFn;
}

/**
 * Creates a React component that can use hooks
 */
function createHookComponent<P extends object>(
  renderFn: (props: P) => ReactNode,
  props: P
): ComponentType<P> {
  const HookComponent: React.FC<P> = (hookProps) => {
    return renderFn({ ...props, ...hookProps } as P) as ReactElement;
  };

  HookComponent.displayName = renderFn.name || "BloxiHookComponent";
  return HookComponent;
}

/**
 * Creates React elements with automatic key handling
 *
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

  // Handle hook-enabled components
  if (typeof type === "function" && (type as HooksComponent)[USES_HOOKS]) {
    const HookComponent = createHookComponent(
      type as (props: P) => ReactNode,
      finalProps
    );
    return React.createElement(HookComponent, finalProps);
  }

  return React.createElement(type, finalProps);
}

/**
 * Makes a component hook-enabled
 *
 * Use this to create components that can use React hooks
 *
 * @example
 * const Counter = hookable(({ initial = 0 }) => {
 *   const [count, setCount] = useStore(initial);
 *   return HtmlDiv({
 *     children: [
 *       HtmlButton({ onClick: () => setCount(count + 1), children: "+" }),
 *       HtmlSpan({ children: count }),
 *       HtmlButton({ onClick: () => setCount(count - 1), children: "-" })
 *     ]
 *   });
 * });
 */
export function hookable<Props extends object, Result extends ReactNode>(
  renderFn: (props: Props) => Result
): (props?: Props) => Result {
  withHooks(renderFn);
  return (props?: Props) => renderFn(props || ({} as Props));
}

/**
 *
 * Manages state in a component
 *
 * @example
 * const [count, setCount] = useStore(0);
 * const [user, setUser] = useStore({ name: "John", age: 30 });
 */
export function useStore<T>(
  initialState: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
  return useState<T>(initialState);
}

/**
 *
 * Runs side effects in your component
 *
 * @example
 * // Runs when component mounts
 * useRun(() => {
 *   console.log("Component mounted");
 *   return () => console.log("Component unmounted");
 * }, []);
 *
 * // Runs when count changes
 * useRun(() => {
 *   document.title = `Count: ${count}`;
 * }, [count]);
 */
export function useRun(
  effect: React.EffectCallback,
  deps?: React.DependencyList
): void {
  return useEffect(effect, deps);
}

/**
 *
 * Creates a mutable reference that persists across renders
 *
 * @example
 * // Reference a DOM element
 * const inputRef = useElem<HTMLInputElement>();
 * HtmlInput({ ref: inputRef });
 *
 * // Store a mutable value
 * const prevCount = useElem(count);
 */
export function useElem<T>(initialValue: T | null = null): React.RefObject<T> {
  return useRef<T | null>(initialValue) as React.RefObject<T>;
}

// For compatibility, re-export React hooks with their original names
export { useState, useEffect, useRef };
