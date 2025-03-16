import React from "react";
import { HtmlDiv } from "..";
import { StyleComponentProps } from "../../../core/createStyleComponent";
import { ResponsiveValue, getResponsiveValue } from "../../utils/responsive";

/**
 * BxGridItem props extend StyleComponentProps with grid item-specific properties
 */
export interface BxGridItemProps extends StyleComponentProps {
  colStart?: ResponsiveValue<number | string>;
  colEnd?: ResponsiveValue<number | string>;
  rowStart?: ResponsiveValue<number | string>;
  rowEnd?: ResponsiveValue<number | string>;
  colSpan?: ResponsiveValue<number>;
  rowSpan?: ResponsiveValue<number>;
  area?: ResponsiveValue<string>;
  justifySelf?: ResponsiveValue<"start" | "end" | "center" | "stretch">;
  alignSelf?: ResponsiveValue<"start" | "end" | "center" | "stretch">;
}

/**
 * BxGridItem component for grid cell items
 */
export const BxGridItem = (props: BxGridItemProps): React.ReactElement => {
  const {
    colStart,
    colEnd,
    rowStart,
    rowEnd,
    colSpan,
    rowSpan,
    area,
    justifySelf,
    alignSelf,
    style = {},
    ...rest
  } = props;

  // Extract responsive values
  const colStartValue = getResponsiveValue(colStart);
  const colEndValue = getResponsiveValue(colEnd);
  const rowStartValue = getResponsiveValue(rowStart);
  const rowEndValue = getResponsiveValue(rowEnd);
  const colSpanValue = getResponsiveValue(colSpan);
  const rowSpanValue = getResponsiveValue(rowSpan);
  const areaValue = getResponsiveValue(area);
  const justifySelfValue = getResponsiveValue(justifySelf);
  const alignSelfValue = getResponsiveValue(alignSelf);

  // Process span shortcuts
  const processedColEnd = colSpanValue
    ? typeof colStartValue === "number"
      ? colStartValue + colSpanValue
      : `span ${colSpanValue}`
    : colEndValue;

  const processedRowEnd = rowSpanValue
    ? typeof rowStartValue === "number"
      ? rowStartValue + rowSpanValue
      : `span ${rowSpanValue}`
    : rowEndValue;

  // Build the combined style object
  const combinedStyle: React.CSSProperties = {
    gridColumnStart: colStartValue,
    gridColumnEnd: processedColEnd,
    gridRowStart: rowStartValue,
    gridRowEnd: processedRowEnd,
    gridArea: areaValue,
    justifySelf: justifySelfValue,
    alignSelf: alignSelfValue,
    ...style, // Include any additional styles passed in
  };

  // All CSS properties are now in the style object
  return HtmlDiv({
    style: combinedStyle,
    ...rest,
  });
};

export default BxGridItem;
