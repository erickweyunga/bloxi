import React from "react";
import { HtmlDiv } from "..";
import { StyleComponentProps } from "../../../core/createStyleComponent";

/**
 * BxContainerProps extends StyleComponentProps with container-specific properties.
 * Used to configure and customize the BxContainer component.
 */
export interface BxContainerProps extends StyleComponentProps {
  /**
   * Maximum width of the container. Can be one of the predefined breakpoints or a custom number or string.
   * - "xs": 480px
   * - "sm": 640px
   * - "md": 768px
   * - "lg": 1024px
   * - "xl": 1280px
   * - "full": 100%
   * - A custom number or string can be provided for custom widths.
   */
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | number | string;

  /**
   * When true, the container will take up the full width of its parent.
   */
  fluid?: boolean;

  /**
   * When true, the container will center its content both horizontally and vertically.
   */
  centerContent?: boolean;
}

/**
 * BxContainer is a component that creates a responsive container with a maximum width.
 * It can optionally center the content and take up the full width when the `fluid` prop is set to true.
 *
 * @param props - The properties to configure the BxContainer component.
 * @returns A React element representing the container with the specified layout properties.
 *
 * @example
 * ```ts
 * BxContainer({
 *   maxWidth: "md",
 *   fluid: false,
 *   centerContent: true,
 *   children: [
 *     HtmlH1({ text: "Welcome to the page" }),
 *     HtmlP({ text: "This is a centered container" })
 *   ]
 * })
 * ```
 */
export const BxContainer = (props: BxContainerProps): React.ReactNode => {
  const { maxWidth = "lg", fluid, centerContent, ...rest } = props;

  // Define standard size breakpoints
  const sizeMap = {
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    full: "100%",
  };

  // Determine the max width value
  const maxWidthValue = fluid
    ? "100%"
    : typeof maxWidth === "string" && maxWidth in sizeMap
      ? sizeMap[maxWidth as keyof typeof sizeMap]
      : maxWidth;

  return HtmlDiv({
    width: "100%",
    maxWidth: maxWidthValue,
    marginLeft: "auto",
    marginRight: "auto",
    display: centerContent ? "flex" : undefined,
    flexDirection: centerContent ? "column" : undefined,
    alignItems: centerContent ? "center" : undefined,
    ...rest,
  });
};

export default BxContainer;
