import React, { Component, ReactNode } from "react";
import { HtmlDiv } from "../bloxi";

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  /**
   * Prevents JSON.stringify from breaking on circular references.
   */
  safeStringify(obj: any): string {
    const seen = new WeakSet();
    return JSON.stringify(obj, function (key, value) {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) return "[Circular]";
        seen.add(value);
      }
      return value;
    });
  }

  render() {
    if (this.state.hasError) {
      return HtmlDiv({
        children: `An error occurred while rendering this component.`,
      });
    }

    // Apply safe JSON.stringify
    const safeChildren = this.safeStringify({ children: this.props.children });

    return HtmlDiv({ children: safeChildren });
  }
}

export { ErrorBoundary };
