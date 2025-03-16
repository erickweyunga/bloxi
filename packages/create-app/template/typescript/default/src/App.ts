import { useState } from "react";
import { Box, Flex, Text } from "@bloxi/core";
import { Button } from "./components/Button";
import { Card } from "./components/Card";

export function App() {
  // Create a state hook for counter
  const [count, setCount] = useState(0);

  // Event handlers
  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(Math.max(0, count - 1));
  const handleReset = () => setCount(0);

  // Using our framework to create a UI
  return Flex({
    direction: "column",
    align: "center",
    justify: "center",
    padding: 24,
    minHeight: "100vh",
    background: "#f9f9f9",
    gap: 24,
    children: [
      Text({
        as: "h1",
        fontSize: 32,
        fontWeight: "bold",
        color: "#333",
        children: "React Blocks App",
      }),

      Card({
        width: { base: "90%", md: 400 },
        elevation: 2,
        children: Flex({
          direction: "column",
          align: "center",
          gap: 24,
          padding: 32,
          children: [
            Text({
              as: "h2",
              fontSize: 24,
              marginBottom: 8,
              children: "Counter Example",
            }),

            Text({
              fontSize: 64,
              fontWeight: "bold",
              color: count > 5 ? "#4CAF50" : "#333",
              children: count.toString(),
            }),

            Flex({
              gap: 12,
              width: "100%",
              justify: "center",
              children: [
                Button({
                  variant: "primary",
                  size: "lg",
                  onClick: handleIncrement,
                  children: "Increment",
                }),

                Button({
                  variant: "danger",
                  size: "lg",
                  onClick: handleDecrement,
                  children: "Decrement",
                }),

                Button({
                  variant: "secondary",
                  size: "lg",
                  onClick: handleReset,
                  children: "Reset",
                }),
              ],
            }),
          ],
        }),
        footer: Flex({
          justify: "center",
          children: Text({
            fontSize: 14,
            color: "#666",
            textAlign: "center",
            children: "Built with React Blocks",
          }),
        }),
      }),

      Flex({
        direction: "column",
        align: "center",
        marginTop: 32,
        children: [
          Text({
            fontSize: 14,
            color: "#666",
            marginBottom: 8,
            children: "Edit src/App.ts to get started!",
          }),

          Text({
            as: "a",
            href: "https://github.com/your-username/bloxi",
            color: "#0366d6",
            textDecoration: "none",
            children: "Learn React Blocks",
          }),
        ],
      }),
    ],
  });
}

export default App;
