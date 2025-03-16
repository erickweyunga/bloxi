import React from "react";
import { HtmlDiv } from "..";
import { StyleComponentProps } from "../../../core/createStyleComponent";

/**
 * BxContainer props extend StyleComponentProps with container-specific properties
 */
export interface BxContainerProps extends StyleComponentProps {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | number | string;
  fluid?: boolean;
  centerContent?: boolean;
}

/**
 * BxContainer component for creating centered, max-width containers
 */
export const BxContainer = (props: BxContainerProps): React.ReactElement => {
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
