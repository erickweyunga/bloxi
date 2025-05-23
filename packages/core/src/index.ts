export {
  createElement,
  hookable,
  useElem,
  useStore,
  useRun,
} from "./core/createElement";
export { renderRoot, render } from "./core/renderer";
export { mapItems, createContainer, createList } from "./core/utils/createList";
export {
  StyleComponentProps as HTMLElementProps,
  createStyleComponent,
} from "./core/createStyleComponent";
export * from "./core/types";
export * from "./core/bloxi";
export * from "./core/bloxi/layout";

import React from "react";

import { initMediaQueryRuntime } from "./core/mediaQueryRuntime";
initMediaQueryRuntime();

export interface StyleProps {
  style?: React.CSSProperties;
  className?: string;
}

export function mergeStyles(
  ...styles: React.CSSProperties[]
): React.CSSProperties {
  return Object.assign({}, ...styles);
}
