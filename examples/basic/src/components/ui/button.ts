import { HtmlButton, HTMLElementProps } from "@bloxi/core";

export interface ButtonProps extends HTMLElementProps {
  variant?: "primary" | "secondary";
  size?: "lg" | "md" | "sm";
}

export const Button = (props: ButtonProps) => {
  const { variant = "primary", size = "md", children, ...rest } = props;

  const variantStyles = {
    primary: { backgroundColor: "#3182ce", color: "white" },
    secondary: { backgroundColor: "#718096", color: "white" },
  };

  const sizeStyles = {
    lg: { padding: "12px 24px", fontSize: "1.25rem" },
    md: { padding: "8px 16px", fontSize: "1rem" },
    sm: { padding: "4px 8px", fontSize: "0.875rem" },
  };

  return HtmlButton({
    ...rest,
    style: {
      ...variantStyles[variant],
      ...sizeStyles[size],
      borderRadius: "4px",
      border: "none",
      cursor: "pointer",
    },
    children,
  });
};
