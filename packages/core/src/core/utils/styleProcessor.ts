import React from "react";
import { isResponsiveObject, getResponsiveValue } from "./responsive";

/**
 * Converts component props into style and non-style properties.
 *
 * This function ensures that CSS-related props are properly moved to the `style` object,
 * while other props remain unchanged and are passed to the component.
 *
 * @param props - The component props containing possible style and other properties.
 * @param cssProperties - A list of valid CSS properties to extract into the `style` object.
 * @returns An object containing `styleProps` for inline styling and `otherProps` for remaining properties.
 */
export function propsToStyle(
  props: Record<string, any>,
  cssProperties: string[]
): {
  styleProps: React.CSSProperties;
  otherProps: Record<string, any>;
} {
  const styleProps: Record<string, any> = {};
  const otherProps: Record<string, any> = {};

  Object.entries(props).forEach(([key, value]) => {
    if (value === undefined) return; // Skip undefined values

    if (cssProperties.includes(key)) {
      // Handle responsive values
      if (isResponsiveObject(value)) {
        const baseValue = getResponsiveValue(value);
        if (baseValue !== undefined) {
          styleProps[key] = processStyleValue(key, baseValue);
        }
      } else {
        styleProps[key] = processStyleValue(key, value);
      }
    } else {
      otherProps[key] = value;
    }
  });

  return { styleProps, otherProps };
}

/**
 * Processes a style value and applies appropriate units where necessary.
 *
 * - Converts numeric values (except unitless CSS properties) to `px`.
 * - Returns undefined for null or undefined values.
 *
 * @param key - The CSS property name.
 * @param value - The value to process.
 * @returns The formatted value with appropriate units.
 */
export function processStyleValue(key: string, value: any): any {
  if (value == null) return undefined; // Handle null and undefined together

  const unitlessProperties = new Set([
    "flex",
    "flexGrow",
    "flexShrink",
    "opacity",
    "zIndex",
    "fontWeight",
    "lineHeight",
    "scale",
    "order",
    "columnCount",
    "fillOpacity",
    "strokeOpacity",
    "strokeWidth",
  ]);

  return typeof value === "number" && !unitlessProperties.has(key)
    ? `${value}px`
    : value;
}
