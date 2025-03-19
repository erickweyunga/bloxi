/**
 * Augmentations for @bloxi/core to better handle React components
 */
import { ReactNode, ComponentType } from "react";

declare module "@bloxi/core" {
  export function createElement(
    type: any,
    props?: any,
    ...children: any[]
  ): any;
}
