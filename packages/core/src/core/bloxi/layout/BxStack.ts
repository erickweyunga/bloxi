import React from "react";
import { BxFlex, BxFlexProps } from "./BxFlex";
import { HtmlDiv } from "..";

/**
 * BxStack props extend BxFlexProps with stack-specific properties.
 * These props provide configuration for creating a stack layout with consistent spacing and optional dividers.
 */
export interface BxStackProps extends BxFlexProps {
  spacing?: number | string;
  horizontal?: boolean;
  dividers?: boolean;
  dividerColor?: string;
  dividerThickness?: number | string;
  recursive?: boolean;
}

/**
 * BxStack component for creating stacked layouts with consistent spacing.
 * Optionally adds dividers between stack items.
 *
 * @param props - The props for configuring the stack layout including spacing, dividers, and orientation.
 * @returns A React element with a stacked layout.
 */
export const BxStack = (props: BxStackProps): React.ReactNode => {
  const {
    spacing = "1rem",
    horizontal = false,
    dividers = false,
    dividerColor = "#e2e8f0",
    dividerThickness = "1px",
    recursive = false,
    children,
    ...rest
  } = props;

  // Process children if dividers are enabled
  let processedChildren = children;

  if (dividers && Array.isArray(children) && children.length > 0) {
    // Insert dividers between children
    processedChildren = [];
    React.Children.forEach(children as React.ReactNode[], (child, index) => {
      // Add the child
      (processedChildren as React.ReactNode[]).push(child);

      // Add a divider after each child except the last one
      if (index < (children as React.ReactNode[]).length - 1) {
        // Create a proper Div element for the divider
        const divider = HtmlDiv({
          key: `divider-${index}`,
          // For horizontal stacks, divider is vertical
          width: horizontal ? dividerThickness : "100%",
          height: horizontal ? "100%" : dividerThickness,
          backgroundColor: dividerColor,
          alignSelf: "stretch",
          flexShrink: 0,
        });

        (processedChildren as React.ReactNode[]).push(divider);
      }
    });
  }

  return BxFlex({
    direction: horizontal ? "row" : "column",
    gap: dividers ? 0 : spacing,
    children: processedChildren,
    ...rest,
  });
};

export default BxStack;
