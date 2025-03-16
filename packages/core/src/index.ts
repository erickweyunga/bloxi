export { createElement } from "./core/createElement";
export { renderRoot, render, createApp } from "./core/renderer";
export { mapItems, createContainer, createList } from "./core/utils/createList";
export { StyleComponentProps as HTMLElementProps, createStyleComponent, extendComponent } from './core/createStyleComponent';
export * from "./core/types";
export * from "./core/bloxi";
export * from "./core/bloxi/layout";

import React from "react";

import { initMediaQueryRuntime } from './core/mediaQueryRuntime';
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
