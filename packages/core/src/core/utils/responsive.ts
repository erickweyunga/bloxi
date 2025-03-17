/**
 * Default breakpoints in pixels
 * These breakpoints define standard screen sizes for responsive styling.
 */
export const defaultBreakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Type definition for breakpoint keys.
 * This includes predefined breakpoints and allows custom string keys.
 */
export type BreakpointKey =
  | "base"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | string;

/**
 * Type for responsive property values.
 * Allows specifying different values for different breakpoints.
 */
export type ResponsiveValue<T> =
  | T
  | {
      base?: T;
      xs?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      "2xl"?: T;
      [key: string]: T | undefined;
    };

/**
 * Type definition for styles that support responsive values.
 */
export type ResponsiveStyle = Record<string, ResponsiveValue<any>>;

/**
 * Checks if a given value is a responsive object.
 * A responsive object contains keys matching predefined breakpoints.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a responsive object, otherwise `false`.
 */
export function isResponsiveObject<T>(
  value: any
): value is { [key in BreakpointKey]?: T } {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value).some((key) =>
      ["base", "xs", "sm", "md", "lg", "xl", "2xl"].includes(key)
    )
  );
}

/**
 * Converts responsive values into CSS custom properties and media queries.
 * This function extracts responsive styles and applies them dynamically.
 *
 * @param obj - The object containing style properties with possible responsive values.
 * @returns A record of styles with responsive values converted to CSS variables.
 */
export function createResponsiveStyles(
  obj: Record<string, any>
): Record<string, any> {
  if (!obj) return {};

  const result: Record<string, any> = {};
  const mediaQueries: Record<string, Record<string, any>> = {};

  // Initialize media query objects
  Object.keys(defaultBreakpoints).forEach((bp) => {
    mediaQueries[bp] = {};
  });

  // Process each style property
  Object.entries(obj).forEach(([prop, value]) => {
    if (value === undefined) return;

    // If not a responsive object, use the value directly
    if (!isResponsiveObject(value)) {
      result[prop] = value;
      return;
    }

    // Handle responsive object
    const responsiveObj = value as Record<string, any>;

    // Set base value if provided
    if (responsiveObj.base !== undefined) {
      result[prop] = responsiveObj.base;
    }

    // Add breakpoint-specific values to media queries
    Object.entries(responsiveObj).forEach(([bp, bpValue]) => {
      if (bp !== "base" && bpValue !== undefined) {
        mediaQueries[bp][prop] = bpValue;
      }
    });
  });

  // Add media query styles to result with special naming
  Object.entries(mediaQueries).forEach(([bp, styles]) => {
    if (Object.keys(styles).length > 0) {
      Object.entries(styles).forEach(([prop, value]) => {
        const mediaQueryProp = `--bx-mq-${bp}-${prop}`;
        result[mediaQueryProp] = value;
      });
    }
  });

  return result;
}

/**
 * Retrieves the base value from a responsive value object.
 * This is useful for server-side rendering or providing fallback values.
 *
 * @param value - The responsive value object or a direct value.
 * @param defaultValue - A fallback value if no valid base value is found.
 * @returns The base value if available, otherwise the first available breakpoint value.
 */
export function getResponsiveValue<T>(
  value: ResponsiveValue<T> | undefined,
  defaultValue?: T
): T | undefined {
  if (value === undefined) return defaultValue;

  // If it's not a responsive object, return it directly
  if (!isResponsiveObject(value)) {
    return value as T;
  }

  // Extract base or first available breakpoint value
  const responsiveObj = value as { [key in BreakpointKey]?: T };
  return responsiveObj.base !== undefined
    ? responsiveObj.base
    : Object.values(responsiveObj).find((v) => v !== undefined) || defaultValue;
}

/**
 * Parses responsive styles into a format suitable for CSS variables.
 * This function ensures that responsive values can be used dynamically at runtime.
 *
 * @param style - The object containing responsive style properties.
 * @returns A processed style object with responsive values converted to CSS variables.
 */
export function parseResponsiveStyle(
  style: Record<string, any> = {}
): Record<string, any> {
  return createResponsiveStyles(style);
}
