import { useState } from "react";
import {
  HtmlH2,
  HtmlP,
  BxContainer,
  BxRow,
  BxColumn,
  BxGrid,
  BxDivider,
  BxStack,
} from "@bloxi/core";
import { Box } from "./components/ui/box";
import { Button } from "./components/ui/button";

/**
 * Example dashboard layout using advanced components
 */
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return BxContainer({
    maxWidth: "xl",
    padding: 0,
    height: "100vh",
    children: [
      // Header
      Box({
        padding: "1rem",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#2c3e50",
        color: "white",
        children: BxRow({
          justify: "space-between",
          align: "center",
          children: [
            HtmlH2({ children: "Bloxi Dashboard" }),
            Button({
              variant: "primary",
              onClick: toggleSidebar,
              children: sidebarOpen ? "Hide Sidebar" : "Show Sidebar",
            }),
          ],
        }),
      }),

      // Main content area with sidebar
      BxRow({
        flex: 1,
        height: "calc(100vh - 64px)",
        children: [
          // Sidebar
          sidebarOpen &&
            BxColumn({
              width: "250px",
              backgroundColor: "#f8f9fa",
              padding: "1rem",
              children: BxStack({
                spacing: "0.5rem",
                children: [
                  Box({
                    padding: "0.5rem",
                    backgroundColor: "#e2e8f0",
                    borderRadius: "4px",
                    children: "Dashboard",
                  }),
                  Box({ padding: "0.5rem", children: "Analytics" }),
                  Box({ padding: "0.5rem", children: "Users" }),
                  Box({ padding: "0.5rem", children: "Settings" }),
                  BxDivider({ spacing: "1rem", color: "#cbd5e0" }),
                  Box({ padding: "0.5rem", children: "Logout" }),
                ],
              }),
            }),

          // Main content
          BxColumn({
            flex: 1,
            padding: "1.5rem",
            overflow: "auto",
            children: [
              HtmlH2({ marginBottom: "1rem", children: "Dashboard Overview" }),

              // Stats cards
              BxGrid({
                columns: { base: 1, md: 2, lg: 4 },
                gap: "10px",
                marginBottom: "2rem",
                children: [
                  Box({
                    padding: "1.5rem",
                    borderRadius: "8px",
                    backgroundColor: "#edf2f7",
                    children: [
                      HtmlH2({ fontSize: "2rem", children: "1,243" }),
                      HtmlP({ color: "#4a5568", children: "Total Users" }),
                    ],
                  }),
                  Box({
                    padding: "1.5rem",
                    borderRadius: "8px",
                    backgroundColor: "#e6fffa",
                    children: [
                      HtmlH2({ fontSize: "2rem", children: "$8,427" }),
                      HtmlP({ color: "#4a5568", children: "Total Revenue" }),
                    ],
                  }),
                  Box({
                    padding: "1.5rem",
                    borderRadius: "8px",
                    backgroundColor: "#fff5f5",
                    children: [
                      HtmlH2({ fontSize: "2rem", children: "89%" }),
                      HtmlP({ color: "#4a5568", children: "Satisfaction" }),
                    ],
                  }),
                  Box({
                    padding: "1.5rem",
                    borderRadius: "8px",
                    backgroundColor: "#f7fafc",
                    children: [
                      HtmlH2({ fontSize: "2rem", children: "24" }),
                      HtmlP({ color: "#4a5568", children: "New Tasks" }),
                    ],
                  }),
                ],
              }),

              BxDivider({ label: "Recent Activity", spacing: "2rem" }),

              // Activity list
              BxStack({
                spacing: "1rem",
                dividers: true,
                padding: "1rem",
                backgroundColor: "#f7fafc",
                borderRadius: "8px",
                children: [
                  BxRow({
                    align: "center",
                    gap: "1rem",
                    children: [
                      Box({
                        width: "40px",
                        height: "40px",
                        borderRadius: "20px",
                        backgroundColor: "#cbd5e0",
                      }),
                      Box({
                        flex: 1,
                        children: [
                          HtmlP({
                            fontWeight: "bold",
                            children: "John Doe updated profile",
                          }),
                          HtmlP({
                            fontSize: "0.875rem",
                            color: "#718096",
                            children: "2 hours ago",
                          }),
                        ],
                      }),
                    ],
                  }),
                  BxRow({
                    align: "center",
                    gap: "1rem",
                    children: [
                      Box({
                        width: "40px",
                        height: "40px",
                        borderRadius: "20px",
                        backgroundColor: "#cbd5e0",
                      }),
                      Box({
                        flex: 1,
                        children: [
                          HtmlP({
                            fontWeight: "bold",
                            children: "New user registered",
                          }),
                          HtmlP({
                            fontSize: "0.875rem",
                            color: "#718096",
                            children: "4 hours ago",
                          }),
                        ],
                      }),
                    ],
                  }),
                  BxRow({
                    align: "center",
                    gap: "1rem",
                    children: [
                      Box({
                        width: "40px",
                        height: "40px",
                        borderRadius: "20px",
                        backgroundColor: "#cbd5e0",
                      }),
                      Box({
                        flex: 1,
                        children: [
                          HtmlP({
                            fontWeight: "bold",
                            children: "Server update completed",
                          }),
                          HtmlP({
                            fontSize: "0.875rem",
                            color: "#718096",
                            children: "1 day ago",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

export default App;
