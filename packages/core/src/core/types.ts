import React, { JSX } from "react";

/**
 * Common props shared across all components
 */
export interface CommonProps {
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  "data-testid"?: string;
  "data-id"?: string;
  onClick?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  onChange?: React.ChangeEventHandler;
  onSubmit?: React.FormEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  onKeyUp?: React.KeyboardEventHandler;
  onKeyPress?: React.KeyboardEventHandler;
  // Accessibility props
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-hidden"?: boolean;
  role?: string;
  tabIndex?: number;
  // Data attributes
  dataAttributes?: { [key: string]: string };
  // Ref
  ref?: React.Ref<any>;
  [key: string]: any;
}

/**
 * Spacing related props
 */
export interface SpacingProps {
  padding?: React.CSSProperties["padding"];
  paddingTop?: React.CSSProperties["paddingTop"];
  paddingRight?: React.CSSProperties["paddingRight"];
  paddingBottom?: React.CSSProperties["paddingBottom"];
  paddingLeft?: React.CSSProperties["paddingLeft"];
  margin?: React.CSSProperties["margin"];
  marginTop?: React.CSSProperties["marginTop"];
  marginRight?: React.CSSProperties["marginRight"];
  marginBottom?: React.CSSProperties["marginBottom"];
  marginLeft?: React.CSSProperties["marginLeft"];
  width?: React.CSSProperties["width"];
  minWidth?: React.CSSProperties["minWidth"];
  maxWidth?: React.CSSProperties["maxWidth"];
  height?: React.CSSProperties["height"];
  minHeight?: React.CSSProperties["minHeight"];
  maxHeight?: React.CSSProperties["maxHeight"];
}

/**
 * Display and positioning props
 */
export interface DisplayProps {
  display?: React.CSSProperties["display"];
  position?: React.CSSProperties["position"];
  top?: React.CSSProperties["top"];
  right?: React.CSSProperties["right"];
  bottom?: React.CSSProperties["bottom"];
  left?: React.CSSProperties["left"];
  zIndex?: React.CSSProperties["zIndex"];
  overflow?: React.CSSProperties["overflow"];
  opacity?: React.CSSProperties["opacity"];
}

/**
 * Appearance and styling props
 */
export interface AppearanceProps extends DisplayProps {
  background?: React.CSSProperties["background"];
  backgroundColor?: React.CSSProperties["backgroundColor"];
  backgroundImage?: React.CSSProperties["backgroundImage"];
  color?: React.CSSProperties["color"];
  border?: React.CSSProperties["border"];
  borderTop?: React.CSSProperties["borderTop"];
  borderRight?: React.CSSProperties["borderRight"];
  borderBottom?: React.CSSProperties["borderBottom"];
  borderLeft?: React.CSSProperties["borderLeft"];
  borderRadius?: React.CSSProperties["borderRadius"];
  boxShadow?: React.CSSProperties["boxShadow"];
  borderStyle?: React.CSSProperties["borderStyle"];
  borderWidth?: React.CSSProperties["borderWidth"];
  borderColor?: React.CSSProperties["borderColor"];
}

/**
 * Flex layout props
 */
export interface FlexProps {
  flexDirection?: React.CSSProperties["flexDirection"];
  flexWrap?: React.CSSProperties["flexWrap"];
  justifyContent?: React.CSSProperties["justifyContent"];
  alignItems?: React.CSSProperties["alignItems"];
  alignContent?: React.CSSProperties["alignContent"];
  alignSelf?: React.CSSProperties["alignSelf"];
  flex?: React.CSSProperties["flex"];
  flexGrow?: React.CSSProperties["flexGrow"];
  flexShrink?: React.CSSProperties["flexShrink"];
  flexBasis?: React.CSSProperties["flexBasis"];
  gap?: React.CSSProperties["gap"];
  rowGap?: React.CSSProperties["rowGap"];
  columnGap?: React.CSSProperties["columnGap"];
}

/**
 * Grid layout props
 */
export interface GridProps {
  gridTemplateColumns?: React.CSSProperties["gridTemplateColumns"];
  gridTemplateRows?: React.CSSProperties["gridTemplateRows"];
  gridTemplateAreas?: React.CSSProperties["gridTemplateAreas"];
  gridAutoColumns?: React.CSSProperties["gridAutoColumns"];
  gridAutoRows?: React.CSSProperties["gridAutoRows"];
  gridAutoFlow?: React.CSSProperties["gridAutoFlow"];
  gridColumn?: React.CSSProperties["gridColumn"];
  gridRow?: React.CSSProperties["gridRow"];
  gridArea?: React.CSSProperties["gridArea"];
  gap?: React.CSSProperties["gap"];
  rowGap?: React.CSSProperties["rowGap"];
  columnGap?: React.CSSProperties["columnGap"];
}

/**
 * Typography props
 */
export interface TypographyProps {
  fontFamily?: React.CSSProperties["fontFamily"];
  fontSize?: React.CSSProperties["fontSize"];
  fontWeight?: React.CSSProperties["fontWeight"];
  lineHeight?: React.CSSProperties["lineHeight"];
  letterSpacing?: React.CSSProperties["letterSpacing"];
  textAlign?: React.CSSProperties["textAlign"];
  textTransform?: React.CSSProperties["textTransform"];
  fontStyle?: React.CSSProperties["fontStyle"];
  textDecoration?: React.CSSProperties["textDecoration"];
  whiteSpace?: React.CSSProperties["whiteSpace"];
  textOverflow?: React.CSSProperties["textOverflow"];
}

/**
 * Transition and animation props
 */
export interface TransitionAnimationProps {
  transition?: React.CSSProperties["transition"];
  transitionProperty?: React.CSSProperties["transitionProperty"];
  transitionDuration?: React.CSSProperties["transitionDuration"];
  transitionTimingFunction?: React.CSSProperties["transitionTimingFunction"];
  transitionDelay?: React.CSSProperties["transitionDelay"];
  animation?: React.CSSProperties["animation"];
  animationName?: React.CSSProperties["animationName"];
  animationDuration?: React.CSSProperties["animationDuration"];
  animationTimingFunction?: React.CSSProperties["animationTimingFunction"];
  animationDelay?: React.CSSProperties["animationDelay"];
  animationIterationCount?: React.CSSProperties["animationIterationCount"];
  animationDirection?: React.CSSProperties["animationDirection"];
  animationPlayState?: React.CSSProperties["animationPlayState"];
}

/**
 * Transform and filter props
 */
export interface TransformFilterProps {
  transform?: React.CSSProperties["transform"];
  transformOrigin?: React.CSSProperties["transformOrigin"];
  filter?: React.CSSProperties["filter"];
  perspective?: React.CSSProperties["perspective"];
  rotate?: React.CSSProperties["rotate"];
  scale?: React.CSSProperties["scale"];
  translate?: React.CSSProperties["translate"];
}

/**
 * Shadow and blur props
 */
export interface ShadowBlurProps {
  boxShadow?: React.CSSProperties["boxShadow"];
  textShadow?: React.CSSProperties["textShadow"];
  filterBlur?: React.CSSProperties["filter"];
}

/**
 * Pointer and cursor props
 */
export interface PointerProps {
  cursor?: React.CSSProperties["cursor"];
  pointerEvents?: React.CSSProperties["pointerEvents"];
}

/**
 * Miscellaneous props
 */
export interface MiscProps {
  userSelect?: React.CSSProperties["userSelect"];
  resize?: React.CSSProperties["resize"];
  willChange?: React.CSSProperties["willChange"];
  visibility?: React.CSSProperties["visibility"];
  overflowWrap?: React.CSSProperties["overflowWrap"];
}
