import React from "react";
import { BxFlex, BxFlexProps } from "./BxFlex";

/**
 * BxColumnProps extends BxFlexProps with column-specific layout properties.
 * Used to configure and customize the BxColumn component.
 */
export interface BxColumnProps extends BxFlexProps {
  /**
   * Spacing between the items inside the column. Can be a number (interpreted as px) or a string with CSS units (e.g., '10px', '2rem').
   */
  spacing?: number | string;

  /**
   * Horizontal alignment of the items inside the column.
   * Can be one of:
   * - "left" (aligns items to the start of the column)
   * - "center" (aligns items to the center)
   * - "right" (aligns items to the end of the column)
   * - "stretch" (stretches items to fill the container)
   */
  horizontalAlign?: "left" | "center" | "right" | "stretch";

  /**
   * Vertical alignment of the items inside the column.
   * Can be one of:
   * - "top" (aligns items to the top)
   * - "middle" (aligns items to the center)
   * - "bottom" (aligns items to the bottom)
   * - "space-between" (distributes items with space between them)
   * - "space-around" (distributes items with space around them)
   * - "space-evenly" (distributes items with even space between them)
   */
  verticalAlign?:
    | "top"
    | "middle"
    | "bottom"
    | "space-between"
    | "space-around"
    | "space-evenly";

  /**
   * When set to true, the column will take up the full height of its parent container.
   * This will override the `height` property.
   */
  fullHeight?: boolean;
}

/**
 * BxColumn is a flexible component for creating vertical layouts using CSS flexbox.
 * It is pre-configured as a flex container with a column layout and provides additional
 * alignment options for both horizontal and vertical directions.
 *
 * @param props - The properties to configure the BxColumn component.
 * @returns A React element representing a flex column with the specified alignment and spacing properties.
 *
 * @example
 * ```ts
 * BxColumn({
 *   spacing: "1rem",
 *   horizontalAlign: "center",
 *   verticalAlign: "middle",
 *   fullHeight: true,
 *   children: [
 *     HtmlH1({ text: "Hello, world!" }),
 *     HtmlP({ text: "This is a column layout" })
 *   ]
 * })
 * ```
 */
export const BxColumn = (props: BxColumnProps): React.ReactNode => {
  const {
    spacing,
    horizontalAlign,
    verticalAlign,
    fullHeight,
    align,
    justify,
    gap,
    height,
    ...rest
  } = props;

  // Map the horizontalAlign prop to a flex-start, center, or flex-end value
  const mappedAlign = horizontalAlign
    ? horizontalAlign === "left"
      ? "flex-start"
      : horizontalAlign === "center"
        ? "center"
        : horizontalAlign === "right"
          ? "flex-end"
          : horizontalAlign
    : align;

  // Map the verticalAlign prop to a flex-start, center, or flex-end value
  const mappedJustify = verticalAlign
    ? verticalAlign === "top"
      ? "flex-start"
      : verticalAlign === "middle"
        ? "center"
        : verticalAlign === "bottom"
          ? "flex-end"
          : verticalAlign
    : justify;

  // Return a BxFlex component with the appropriate settings for a column layout
  return BxFlex({
    direction: "column",
    align: mappedAlign,
    justify: mappedJustify,
    gap: spacing || gap,
    height: fullHeight ? "100%" : height,
    ...rest,
  });
};

export default BxColumn;
