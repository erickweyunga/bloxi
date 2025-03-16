/**
 * Default breakpoints in pixels
 */
export const defaultBreakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// Breakpoint type for TypeScript
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
 * Type for responsive prop values
 * Allows using different values at different breakpoints
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
 * Type for all CSS properties that can be responsive
 * Using Record to simplify complex type unions
 */
export type ResponsiveStyle = Record<string, ResponsiveValue<any>>;

/**
 * Determines if a value is a responsive object
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
 * Converts responsive values into CSS custom properties and media queries
 * that will work in style objects.
 *
 * Simplified to avoid complex union types
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

    // If not a responsive object, just use the value directly
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
 * Get a base value from a responsive value (for server rendering or fallbacks)
 */
export function getResponsiveValue<T>(
  value: ResponsiveValue<T> | undefined,
  defaultValue?: T
): T | undefined {
  if (value === undefined) return defaultValue;

  // If it's not a responsive object, just return it
  if (!isResponsiveObject(value)) {
    return value as T;
  }

  // It's a responsive object
  const responsiveObj = value as { [key in BreakpointKey]?: T };

  // Use base or first defined breakpoint
  return responsiveObj.base !== undefined
    ? responsiveObj.base
    : Object.values(responsiveObj).find((v) => v !== undefined) || defaultValue;
}

/**
 * Convert responsive values to CSS variables that can be used with media queries in runtime
 *
 * Simplified to avoid complex type issues
 */
export function parseResponsiveStyle(
  style: Record<string, any> = {}
): Record<string, any> {
  return createResponsiveStyles(style);
}
