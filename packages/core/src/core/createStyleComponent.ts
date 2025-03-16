import React, { JSX } from "react";
import { createElement } from "./createElement";
import { AppearanceProps, CommonProps, SpacingProps } from "./types";
import {
  isResponsiveObject,
  parseResponsiveStyle,
} from "./utils/responsive";
import { propsToStyle } from "./utils/styleProcessor";

// Utility type for style components
export type StyleComponentProps = CommonProps & SpacingProps & AppearanceProps;

/**
 * Complete list of CSS properties that should be moved to the style object
 * This ensures all CSS properties are properly handled
 */
export const CSS_PROPERTIES = [
  // Layout
  "width",
  "height",
  "minWidth",
  "minHeight",
  "maxWidth",
  "maxHeight",
  "display",
  "visibility",
  "overflow",
  "overflowX",
  "overflowY",
  "overflowWrap",
  "whiteSpace",
  "textOverflow",
  "resize",
  "verticalAlign",
  "boxSizing",
  "tableLayout",
  "borderCollapse",
  "borderSpacing",
  "emptyCells",

  // Spacing and Positioning
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "zIndex",
  "float",
  "clear",

  // Typography
  "color",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "fontVariant",
  "lineHeight",
  "letterSpacing",
  "textAlign",
  "textTransform",
  "textDecoration",
  "textDecorationLine",
  "textDecorationStyle",
  "textDecorationColor",
  "textIndent",
  "textJustify",
  "textShadow",
  "wordBreak",
  "wordSpacing",
  "wordWrap",

  // Appearance
  "background",
  "backgroundColor",
  "backgroundImage",
  "backgroundSize",
  "backgroundPosition",
  "backgroundRepeat",
  "backgroundAttachment",
  "backgroundClip",
  "backgroundOrigin",
  "opacity",
  "boxShadow",
  "outline",
  "outlineColor",
  "outlineStyle",
  "outlineWidth",
  "outlineOffset",

  // Border
  "border",
  "borderTop",
  "borderRight",
  "borderBottom",
  "borderLeft",
  "borderWidth",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "borderStyle",
  "borderTopStyle",
  "borderRightStyle",
  "borderBottomStyle",
  "borderLeftStyle",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor",
  "borderRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "borderImage",
  "borderImageSource",
  "borderImageSlice",
  "borderImageWidth",
  "borderImageOutset",
  "borderImageRepeat",

  // Flex properties
  "flex",
  "flexDirection",
  "flexWrap",
  "flexFlow",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "justifyContent",
  "alignItems",
  "alignContent",
  "alignSelf",
  "order",
  "gap",
  "rowGap",
  "columnGap",

  // Grid properties
  "grid",
  "gridTemplate",
  "gridTemplateColumns",
  "gridTemplateRows",
  "gridTemplateAreas",
  "gridColumn",
  "gridColumnStart",
  "gridColumnEnd",
  "gridRow",
  "gridRowStart",
  "gridRowEnd",
  "gridArea",
  "gridAutoFlow",
  "gridAutoRows",
  "gridAutoColumns",
  "justifyItems",
  "placeItems",
  "placeContent",
  "placeSelf",

  // Transform and Transitions
  "transform",
  "transformOrigin",
  "transition",
  "transitionProperty",
  "transitionDuration",
  "transitionTimingFunction",
  "transitionDelay",
  "animation",
  "animationName",
  "animationDuration",
  "animationTimingFunction",
  "animationDelay",
  "animationIterationCount",
  "animationDirection",
  "animationFillMode",
  "animationPlayState",

  // Miscellaneous
  "cursor",
  "userSelect",
  "pointerEvents",
  "filter",
  "backdropFilter",
  "willChange",
  "objectFit",
  "objectPosition",
  "content",
  "clipPath",
  "mask",
  "maskImage",
  "scrollBehavior",
  "scrollMargin",
  "scrollPadding",
  "scrollSnapType",
  "scrollSnapAlign",
  "touchAction",
];

/**
 * Creates a styled component with automatic style prop handling and responsive support
 *
 * @param defaultElement Default HTML element to render
 * @param displayName Optional name for debugging
 * @returns A component factory function that handles style props
 */
export function createStyleComponent<
  P extends StyleComponentProps = StyleComponentProps,
>(defaultElement: keyof JSX.IntrinsicElements = "div", displayName?: string) {
  // Create the component
  const StyledComponent = (props: P): React.ReactElement => {
    const { as = defaultElement, style = {}, ...rest } = props;

    // Use styleProcessor to handle all style props
    const { styleProps, otherProps } = propsToStyle(rest, CSS_PROPERTIES);

    // Handle responsive styles
    const responsiveProps: Record<string, any> = {};

    // Process props for responsive values
    Object.entries(rest).forEach(([key, value]) => {
      if (CSS_PROPERTIES.includes(key) && isResponsiveObject(value)) {
        responsiveProps[key] = value;
      }
    });

    // Parse responsive styles into CSS variables
    const responsiveStyles = parseResponsiveStyle(responsiveProps as any);

    // Merge all styles with proper precedence
    const combinedStyle = {
      ...styleProps,
      ...responsiveStyles,
      ...style, // The passed style prop takes precedence
    };

    // Create the element with the combined style
    return createElement(as as React.ElementType, {
      ...otherProps,
      style: combinedStyle,
    });
  };

  // Set display name for debugging
  if (displayName) {
    StyledComponent.displayName = displayName;
  }

  return StyledComponent;
}

/**
 * Creates a component extension that inherits from another component
 */
export function extendComponent<
  BaseProps extends StyleComponentProps,
  ExtendedProps extends StyleComponentProps,
>(
  BaseComponent: (props: BaseProps) => React.ReactElement,
  defaultProps?: Partial<ExtendedProps>,
  displayName?: string
) {
  const ExtendedComponent = (
    props: ExtendedProps & BaseProps
  ): React.ReactElement => {
    return BaseComponent({
      ...defaultProps,
      ...props,
    } as BaseProps);
  };

  if (displayName) {
    ExtendedComponent.displayName = displayName;
  }

  return ExtendedComponent;
}
