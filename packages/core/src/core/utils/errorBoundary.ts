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

  render() {
    if (this.state.hasError) {
      return HtmlDiv({
        children: `
            An error occurred while rendering this component.
            ${this.props.children}
        `,
      });
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
