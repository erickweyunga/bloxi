import React from "react";
import { isResponsiveObject, getResponsiveValue } from "./responsive";

/**
 * Helper to convert props to style object
 * This ensures all CSS properties are properly put in the style object
 * rather than being passed directly as DOM props
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

  // Process all props
  Object.entries(props).forEach(([key, value]) => {
    // Skip undefined values
    if (value === undefined) return;

    // If this is a CSS property, add it to style props
    if (cssProperties.includes(key)) {
      // Process responsive values
      if (isResponsiveObject(value)) {
        // Get base value for now (full responsive handling would use CSS variables)
        const baseValue = getResponsiveValue(value);
        if (baseValue !== undefined) {
          styleProps[key] = processStyleValue(key, baseValue);
        }
      } else {
        // Process regular values
        styleProps[key] = processStyleValue(key, value);
      }
    } else {
      // Otherwise, keep it as a regular DOM prop
      otherProps[key] = value;
    }
  });

  return { styleProps, otherProps };
}

/**
 * Process a style value with appropriate units
 */
export function processStyleValue(key: string, value: any): any {
  // Return undefined for undefined/null values
  if (value === undefined || value === null) return undefined;

  // Convert numbers to pixels for spacing properties
  if (typeof value === "number") {
    // Properties that should not be converted to pixels
    const noUnitProperties = [
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
    ];

    if (noUnitProperties.includes(key)) {
      return value;
    }

    // Convert to px for all other numeric values
    return `${value}px`;
  }

  return value;
}
