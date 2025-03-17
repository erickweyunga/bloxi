import React from "react";
import { BxFlex, BxFlexProps } from "./BxFlex";

/**
 * BxRow props extend BxFlexProps with row-specific properties.
 * These props provide customization options for the layout and alignment of a flex row.
 */
export interface BxRowProps extends BxFlexProps {
  noWrap?: boolean;
  spacing?: number | string;
  verticalAlign?: "top" | "middle" | "bottom" | "stretch" | "baseline";
  horizontalAlign?:
    | "left"
    | "center"
    | "right"
    | "space-between"
    | "space-around"
    | "space-evenly";
}

/**
 * BxRow component for creating horizontal layouts.
 * Pre-configured as a flex row with additional alignment options for both vertical and horizontal alignment.
 *
 * @param props - The props for configuring the row layout including flex properties, spacing, and alignment.
 * @returns A React element with a flex row layout.
 */
export const BxRow = (props: BxRowProps): React.ReactNode => {
  const {
    noWrap,
    spacing,
    verticalAlign,
    horizontalAlign,
    wrap,
    align,
    justify,
    gap,
    ...rest
  } = props;

  // Map the row-specific props to flex properties
  const mappedAlign = verticalAlign
    ? verticalAlign === "top"
      ? "flex-start"
      : verticalAlign === "middle"
        ? "center"
        : verticalAlign === "bottom"
          ? "flex-end"
          : verticalAlign
    : align;

  const mappedJustify = horizontalAlign
    ? horizontalAlign === "left"
      ? "flex-start"
      : horizontalAlign === "center"
        ? "center"
        : horizontalAlign === "right"
          ? "flex-end"
          : horizontalAlign
    : justify;

  // Return BxFlex with the row-specific configurations applied, and explicitly pass gap or spacing
  return BxFlex({
    direction: "row",
    wrap: noWrap ? "nowrap" : wrap || "wrap",
    align: mappedAlign,
    justify: mappedJustify,
    gap: spacing || gap,
    ...rest,
  });
};

export default BxRow;
