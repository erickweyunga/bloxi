import React from "react";
import { BxFlex, BxFlexProps } from "./BxFlex";

/**
 * BxColumn props extend BxFlexProps with column-specific properties
 */
export interface BxColumnProps extends BxFlexProps {
  spacing?: number | string;
  horizontalAlign?: "left" | "center" | "right" | "stretch";
  verticalAlign?:
    | "top"
    | "middle"
    | "bottom"
    | "space-between"
    | "space-around"
    | "space-evenly";
  fullHeight?: boolean;
}

/**
 * BxColumn component for creating vertical layouts
 * Pre-configured as a flex column with additional alignment options
 */
export const BxColumn = (props: BxColumnProps): React.ReactElement => {
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

  // Map the column-specific props to flex properties
  const mappedAlign = horizontalAlign
    ? horizontalAlign === "left"
      ? "flex-start"
      : horizontalAlign === "center"
        ? "center"
        : horizontalAlign === "right"
          ? "flex-end"
          : horizontalAlign
    : align;

  const mappedJustify = verticalAlign
    ? verticalAlign === "top"
      ? "flex-start"
      : verticalAlign === "middle"
        ? "center"
        : verticalAlign === "bottom"
          ? "flex-end"
          : verticalAlign
    : justify;

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
