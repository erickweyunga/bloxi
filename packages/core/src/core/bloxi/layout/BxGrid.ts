import React from "react";
import { HtmlDiv } from "..";
import { StyleComponentProps } from "../../../core/createStyleComponent";
import { ResponsiveValue, getResponsiveValue } from "../../utils/responsive";

/**
 * BxGrid props extend StyleComponentProps with grid-specific properties
 */
export interface BxGridProps extends StyleComponentProps {
  columns?: ResponsiveValue<number | string>;
  rows?: ResponsiveValue<number | string>;
  autoColumns?: ResponsiveValue<string>;
  autoRows?: ResponsiveValue<string>;
  templateColumns?: ResponsiveValue<string>;
  templateRows?: ResponsiveValue<string>;
  templateAreas?: ResponsiveValue<string>;
  gap?: ResponsiveValue<number | string>;
  rowGap?: ResponsiveValue<number | string>;
  columnGap?: ResponsiveValue<number | string>;
  justifyItems?: "start" | "end" | "center" | "stretch";
  alignItems?: "start" | "end" | "center" | "stretch";
  justifyContent?:
    | "start"
    | "end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignContent?:
    | "start"
    | "end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around"
    | "space-evenly";
  autoFlow?: "row" | "column" | "row dense" | "column dense";
  inline?: boolean;
}

/**
 * Process a value that might need unit conversion
 */
const processValue = (
  value: string | number | undefined
): string | undefined => {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
};

/**
 * BxGrid component for creating grid layouts
 */
export const BxGrid = (props: BxGridProps): React.ReactElement => {
  const {
    columns,
    rows,
    autoColumns,
    autoRows,
    templateColumns,
    templateRows,
    templateAreas,
    gap,
    rowGap,
    columnGap,
    justifyItems,
    alignItems,
    justifyContent,
    alignContent,
    autoFlow,
    inline = false,
    style = {},
    ...rest
  } = props;

  const processColumns = (
    val: number | string | undefined
  ): string | undefined => {
    if (val === undefined) return undefined;

    if (typeof val === "number") {
      return `repeat(${val}, 1fr)`;
    }

    if (typeof val === "string") {
      if (
        !val.includes("repeat") &&
        !val.includes("fr") &&
        !val.includes("px")
      ) {
        return `repeat(${val}, 1fr)`;
      }
      return val;
    }

    return undefined;
  };

  const columnsValue = getResponsiveValue(columns);
  const rowsValue = getResponsiveValue(rows);
  const gapValue = getResponsiveValue(gap);
  const rowGapValue = getResponsiveValue(rowGap);
  const columnGapValue = getResponsiveValue(columnGap);
  const templateColumnsValue = getResponsiveValue(templateColumns);
  const templateRowsValue = getResponsiveValue(templateRows);
  const templateAreasValue = getResponsiveValue(templateAreas);
  const autoColumnsValue = getResponsiveValue(autoColumns);
  const autoRowsValue = getResponsiveValue(autoRows);
  const autoFlowValue = getResponsiveValue(autoFlow);

  const combinedStyle: React.CSSProperties = {
    display: inline ? "inline-grid" : "grid",
    gridTemplateColumns:
      processColumns(templateColumnsValue) || processColumns(columnsValue),
    gridTemplateRows:
      processColumns(templateRowsValue) || processColumns(rowsValue),
    gridTemplateAreas: templateAreasValue,
    gridAutoColumns: autoColumnsValue,
    gridAutoRows: autoRowsValue,
    gridAutoFlow: autoFlowValue,
    justifyItems,
    alignItems,
    justifyContent,
    alignContent,
    ...style,
  };

  if (gapValue !== undefined) {
    combinedStyle.gap = processValue(gapValue);
    // For older browsers, also set gridGap
    (combinedStyle as any).gridGap = processValue(gapValue);
  }

  if (rowGapValue !== undefined) {
    combinedStyle.rowGap = processValue(rowGapValue);
    // For older browsers
    (combinedStyle as any).gridRowGap = processValue(rowGapValue);
  }

  if (columnGapValue !== undefined) {
    combinedStyle.columnGap = processValue(columnGapValue);
    // For older browsers
    (combinedStyle as any).gridColumnGap = processValue(columnGapValue);
  }

  return HtmlDiv({
    "data-component": "BxGrid",
    style: combinedStyle,
    ...rest,
  });
};

export default BxGrid;
