import React, { Component, ReactNode, ErrorInfo } from "react";
import {
  HtmlDiv,
  HtmlButton,
  HtmlH3,
  HtmlPre,
  HtmlDetails,
  HtmlSummary,
} from "../bloxi";

interface ErrorBoundaryProps {
  // Make children optional
  children?: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Catches and handles errors in React component trees
 *
 * Prevents the whole app from crashing when a component fails
 * and provides helpful error information for debugging.
 *
 * @example
 * // Basic usage
 * createElement(ErrorBoundary, {}, MyComponent())
 *
 * // With custom error handler
 * createElement(ErrorBoundary, {
 *   onError: (error) => logErrorToService(error),
 *   fallback: (error, reset) => CustomErrorView({ error, reset })
 * }, MyComponent())
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Update state with error info for rendering
    this.setState({ errorInfo });

    // Call custom error handler if provided
    if (this.props.onError) {
      try {
        this.props.onError(error, errorInfo);
      } catch (handlerError) {
        console.error("Error in error handler:", handlerError);
      }
    }

    // Always log to console for debugging
    console.error("Caught in ErrorBoundary:", error);
    console.error("Component stack:", errorInfo.componentStack);
  }

  // Reset the error state to try rendering again
  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children || null;
    }

    // Check for custom fallback
    if (this.props.fallback) {
      if (typeof this.props.fallback === "function" && this.state.error) {
        // Explicitly cast the result to ReactNode to satisfy TypeScript
        return this.props.fallback(
          this.state.error,
          this.resetErrorBoundary
        ) as ReactNode;
      }
      return typeof this.props.fallback === "function"
        ? null
        : this.props.fallback;
    }

    // Default error UI
    return HtmlDiv({
      className: "bloxi-error-boundary",
      style: {
        padding: "16px",
        margin: "16px",
        border: "1px solid #f56565",
        borderRadius: "4px",
        backgroundColor: "#fff5f5",
        color: "#2d3748",
      },
      children: [
        HtmlH3({
          style: { marginTop: 0, color: "#c53030" },
          children: "Something went wrong",
        }),

        HtmlDiv({
          children:
            this.state.error?.message || "An error occurred while rendering",
        }),

        // Only show detail in development
        process.env.NODE_ENV !== "production"
          ? HtmlDetails({
              style: { marginTop: "16px" },
              children: [
                HtmlSummary({ children: "View technical details" }),
                HtmlPre({
                  style: {
                    overflow: "auto",
                    fontSize: "12px",
                    padding: "8px",
                    backgroundColor: "#f7fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                  },
                  children: [
                    this.state.error?.stack || "No stack trace available",
                    "\n\nComponent Stack:",
                    this.state.errorInfo?.componentStack ||
                      "No component stack available",
                  ].join("\n"),
                }),
              ],
            })
          : null,

        HtmlButton({
          onClick: this.resetErrorBoundary,
          style: {
            marginTop: "16px",
            padding: "8px 16px",
            backgroundColor: "#3182ce",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          },
          children: "Try Again",
        }),
      ].filter(Boolean) as ReactNode[],
    });
  }
}

export { ErrorBoundary };
