import React from "react";
import { HtmlDiv } from "..";
import { StyleComponentProps } from "../../../core/createStyleComponent";
import { ResponsiveValue, getResponsiveValue } from "../../utils/responsive";

/**
 * BxFlexProps extends StyleComponentProps with flex-specific properties.
 * It allows configuring the layout and alignment of elements inside the BxFlex container.
 */
export interface BxFlexProps extends StyleComponentProps {
  /**
   * Defines the flex container's direction. It can be one of:
   * - "row" (default): Items are placed in a row (horizontally).
   * - "column": Items are placed in a column (vertically).
   * - "row-reverse": Items are placed in a row (horizontally) but reversed.
   * - "column-reverse": Items are placed in a column (vertically) but reversed.
   */
  direction?: ResponsiveValue<
    "row" | "column" | "row-reverse" | "column-reverse"
  >;

  /**
   * Defines the wrapping behavior of the flex items. It can be one of:
   * - "nowrap" (default): Items are displayed in a single line.
   * - "wrap": Items will wrap onto new lines as needed.
   * - "wrap-reverse": Items will wrap onto new lines in reverse order.
   */
  wrap?: ResponsiveValue<"nowrap" | "wrap" | "wrap-reverse">;

  /**
   * Defines the alignment of items along the main axis (horizontally for "row" or vertically for "column").
   * Can be one of:
   * - "flex-start" (default): Items are aligned to the start.
   * - "flex-end": Items are aligned to the end.
   * - "center": Items are centered.
   * - "space-between": Items are spaced evenly with the first item at the start and the last at the end.
   * - "space-around": Items are spaced evenly with equal space around each item.
   * - "space-evenly": Items are spaced evenly with equal space between them.
   */
  justify?: ResponsiveValue<
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
  >;

  /**
   * Defines the alignment of items along the cross axis (vertically for "row" or horizontally for "column").
   * Can be one of:
   * - "flex-start": Items are aligned to the start.
   * - "flex-end": Items are aligned to the end.
   * - "center": Items are centered.
   * - "stretch": Items are stretched to fill the container.
   * - "baseline": Items are aligned based on their baseline.
   */
  align?: ResponsiveValue<
    "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
  >;

  /**
   * Defines how the content of the flex container is aligned along the cross axis.
   * Can be one of:
   * - "flex-start", "flex-end", "center", "stretch", "space-between", "space-around"
   */
  alignContent?: ResponsiveValue<
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around"
  >;

  /**
   * Defines the gap between items. Can be a number (interpreted as px) or a string with CSS units (e.g., '10px', '2rem').
   */
  gap?: ResponsiveValue<number | string>;

  /**
   * Defines the gap between rows. Can be a number (interpreted as px) or a string with CSS units.
   */
  rowGap?: ResponsiveValue<number | string>;

  /**
   * Defines the gap between columns. Can be a number (interpreted as px) or a string with CSS units.
   */
  columnGap?: ResponsiveValue<number | string>;

  /**
   * Defines the flex grow, shrink, and basis properties.
   */
  flex?: ResponsiveValue<number | string>;

  /**
   * When true, the flex container behaves like an inline-flex container.
   */
  inline?: boolean;
}

/**
 * BxFlex is a component that enables the creation of flexible layouts using flexbox.
 * It provides several properties to control the direction, alignment, and spacing of flex items.
 *
 * @param props - The properties to configure the BxFlex component.
 * @returns A React element that represents a flexible container with the specified layout.
 *
 * @example
 * ```ts
 * BxFlex({
 *   direction: "row",
 *   justify: "center",
 *   align: "center",
 *   gap: "1rem",
 *   children: [
 *     HtmlDiv({ text: "Item 1" }),
 *     HtmlDiv({ text: "Item 2" })
 *   ]
 * })
 * ```
 */
export const BxFlex = (props: BxFlexProps): React.ReactNode => {
  const {
    direction,
    wrap,
    justify,
    align,
    alignContent,
    gap,
    rowGap,
    columnGap,
    flex,
    inline = false,
    style = {},
    ...rest
  } = props;

  // Extract responsive values using a utility function
  const directionValue = getResponsiveValue(direction);
  const wrapValue = getResponsiveValue(wrap);
  const justifyValue = getResponsiveValue(justify);
  const alignValue = getResponsiveValue(align);
  const alignContentValue = getResponsiveValue(alignContent);
  const gapValue = getResponsiveValue(gap);
  const rowGapValue = getResponsiveValue(rowGap);
  const columnGapValue = getResponsiveValue(columnGap);
  const flexValue = getResponsiveValue(flex);

  // Process numeric gap values into valid CSS format
  const processedGap =
    typeof gapValue === "number" ? `${gapValue}px` : gapValue;
  const processedRowGap =
    typeof rowGapValue === "number" ? `${rowGapValue}px` : rowGapValue;
  const processedColumnGap =
    typeof columnGapValue === "number" ? `${columnGapValue}px` : columnGapValue;

  // Combine all styles into one object for the flex container
  const combinedStyle: React.CSSProperties = {
    display: inline ? "inline-flex" : "flex",
    flexDirection: directionValue,
    flexWrap: wrapValue,
    justifyContent: justifyValue,
    alignItems: alignValue,
    alignContent: alignContentValue,
    gap: processedGap,
    rowGap: processedRowGap,
    columnGap: processedColumnGap,
    flex: flexValue,
    ...style, // Merge any additional custom styles passed in
  };

  // Return the HtmlDiv with the computed styles and the rest of the props
  return HtmlDiv({
    style: combinedStyle,
    ...rest,
  });
};

export default BxFlex;
