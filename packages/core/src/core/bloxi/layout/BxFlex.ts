import React from "react";
import { HtmlDiv } from "..";
import { StyleComponentProps } from "../../../core/createStyleComponent";
import { ResponsiveValue, getResponsiveValue } from "../../utils/responsive";

/**
 * BxFlex props extend StyleComponentProps with flex-specific properties
 */
export interface BxFlexProps extends StyleComponentProps {
  direction?: ResponsiveValue<
    "row" | "column" | "row-reverse" | "column-reverse"
  >;
  wrap?: ResponsiveValue<"nowrap" | "wrap" | "wrap-reverse">;
  justify?: ResponsiveValue<
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
  >;
  align?: ResponsiveValue<
    "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
  >;
  alignContent?: ResponsiveValue<
    | "flex-start"
    | "flex-end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around"
  >;
  gap?: ResponsiveValue<number | string>;
  rowGap?: ResponsiveValue<number | string>;
  columnGap?: ResponsiveValue<number | string>;
  flex?: ResponsiveValue<number | string>;
  inline?: boolean;
}

/**
 * BxFlex component for creating flexible layouts
 */
export const BxFlex = (props: BxFlexProps): React.ReactElement => {
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

  // Extract responsive values
  const directionValue = getResponsiveValue(direction);
  const wrapValue = getResponsiveValue(wrap);
  const justifyValue = getResponsiveValue(justify);
  const alignValue = getResponsiveValue(align);
  const alignContentValue = getResponsiveValue(alignContent);
  const gapValue = getResponsiveValue(gap);
  const rowGapValue = getResponsiveValue(rowGap);
  const columnGapValue = getResponsiveValue(columnGap);
  const flexValue = getResponsiveValue(flex);

  // Process numeric gap values
  const processedGap =
    typeof gapValue === "number" ? `${gapValue}px` : gapValue;
  const processedRowGap =
    typeof rowGapValue === "number" ? `${rowGapValue}px` : rowGapValue;
  const processedColumnGap =
    typeof columnGapValue === "number" ? `${columnGapValue}px` : columnGapValue;

  // Build the combined style object
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
    ...style, // Include any additional styles passed in
  };

  // All CSS properties are now in the style object
  return HtmlDiv({
    style: combinedStyle,
    ...rest,
  });
};

export default BxFlex;
