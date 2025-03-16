import React from "react";
import { HtmlDiv } from "..";
import { StyleComponentProps } from "../../../core/createStyleComponent";

/**
 * BxDivider props extend StyleComponentProps with divider-specific properties
 */
export interface BxDividerProps extends StyleComponentProps {
  orientation?: "horizontal" | "vertical";
  color?: string;
  thickness?: number | string;
  spacing?: number | string;
  variant?: "solid" | "dashed" | "dotted";
  label?: React.ReactNode;
  labelPosition?: "left" | "center" | "right";
}

/**
 * BxDivider component for creating separators
 */
export const BxDivider = (props: BxDividerProps): React.ReactElement => {
  const {
    orientation = "horizontal",
    color = "#e2e8f0",
    thickness = 1,
    spacing = "1rem",
    variant = "solid",
    label,
    labelPosition = "center",
    ...rest
  } = props;

  const isHorizontal = orientation === "horizontal";

  // If there's a label, create a more complex divider with label
  if (label && isHorizontal) {
    return HtmlDiv({
      display: "flex",
      alignItems: "center",
      width: "100%",
      margin: `${spacing} 0`,
      ...rest,
      children: [
        // Left line - Important: add all CSS properties in style object
        HtmlDiv({
          flex:
            labelPosition === "left"
              ? "0 0 auto"
              : labelPosition === "center"
                ? 1
                : "1 1 auto",
          style: {
            height:
              typeof thickness === "number" ? `${thickness}px` : thickness,
            backgroundColor: color,
            borderStyle: variant !== "solid" ? variant : undefined,
            borderWidth: variant !== "solid" ? thickness : undefined,
            borderColor: variant !== "solid" ? color : undefined,
            marginRight: labelPosition === "right" ? 0 : spacing,
          },
        }),

        // Label
        label &&
          HtmlDiv({
            flexShrink: 0,
            style: {
              padding: `0 ${typeof spacing === "number" ? spacing / 2 : parseInt(spacing as string) / 2}px`,
            },
          }),

        // Right line - Important: add all CSS properties in style object
        HtmlDiv({
          flex:
            labelPosition === "right"
              ? "0 0 auto"
              : labelPosition === "center"
                ? 1
                : "1 1 auto",
          style: {
            height:
              typeof thickness === "number" ? `${thickness}px` : thickness,
            backgroundColor: color,
            borderStyle: variant !== "solid" ? variant : undefined,
            borderWidth: variant !== "solid" ? thickness : undefined,
            borderColor: variant !== "solid" ? color : undefined,
            marginLeft: labelPosition === "left" ? 0 : spacing,
          },
        }),
      ],
    });
  }

  // Simple divider without label - Important: add all CSS properties in style object
  return HtmlDiv({
    alignSelf: "stretch",
    style: {
      width: isHorizontal
        ? "100%"
        : typeof thickness === "number"
          ? `${thickness}px`
          : thickness,
      height: isHorizontal
        ? typeof thickness === "number"
          ? `${thickness}px`
          : thickness
        : "auto",
      backgroundColor: variant === "solid" ? color : "transparent",
      borderStyle: variant !== "solid" ? variant : undefined,
      borderWidth: variant !== "solid" ? thickness : undefined,
      borderColor: variant !== "solid" ? color : undefined,
      margin: isHorizontal ? `${spacing} 0` : `0 ${spacing}`,
      borderTopWidth:
        isHorizontal && variant !== "solid" ? thickness : undefined,
      borderRightWidth:
        !isHorizontal && variant !== "solid" ? thickness : undefined,
      borderLeftWidth: 0, // Explicitly set to 0
      borderBottomWidth: 0, // Explicitly set to 0
      flexShrink: 0,
    },
    ...rest,
  });
};

export default BxDivider;
