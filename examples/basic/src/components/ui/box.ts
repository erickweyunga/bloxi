import { createStyleComponent, HTMLElementProps } from "@bloxi/core";

/**
 * Box component using the factory function
 *
 * A fundamental building block for layout and styling
 */
export type BoxProps = HTMLElementProps;

/**
 * Box component
 * This is the base component that all other components build upon
 */
export const Box = createStyleComponent("div", "Box");

export default Box;
