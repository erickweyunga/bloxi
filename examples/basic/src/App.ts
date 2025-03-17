import { useState } from "react";
import { Box } from "./components/ui/box";
import { Button } from "./components/ui/button";
import {
  BxContainer,
  BxRow,
  BxColumn,
  HtmlH1,
  HtmlH2,
  HtmlP,
} from "@bloxi/core";

/**
 * Landing Page
 */
const LandingPage = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);

  const toggleSignupModal = () => setShowSignupModal(!showSignupModal);

  return BxContainer({
    children: [
      // Header Section
      Box({
        key: "header",
        children: BxRow({
          className: "!px-6 !py-8 !bg-[#34495e] !text-white flex justify-between",
          children: [
            HtmlH1({
              className: "!text-2xl font-semibold text-[#ecf0f1]",
              children: "FinTechHub",
            }),
            Button({
              className:
                "bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-500",
              children: "Start Your Journey",
              onClick: toggleSignupModal,
            }),
          ],
        }),
      }),

      // Hero Section
      Box({
        key: "hero",
        children: BxRow({
          className: "justify-center px-6 py-24 bg-[#1abc9c] text-white",
          children: BxColumn({
            children: [
              HtmlH1({
                className: "text-3xl font-semibold mb-4 text-center",
                children: "Transform Your Financial Future",
              }),
              HtmlP({
                className: "text-lg text-[#ecf0f1] mb-6 text-center",
                children:
                  "With the latest financial tools, easily track, manage, and grow your wealth. Unlock your financial potential with ease.",
              }),
              Button({
                className:
                  "bg-yellow-500 text-teal-800 px-8 py-3 rounded-full text-xl hover:bg-yellow-400",
                children: "Get Started Today",
                onClick: toggleSignupModal,
              }),
            ],
          }),
        }),
      }),

      // Features Section
      Box({
        key: "features",
        children: BxRow({
          className: "justify-center px-6 py-16 bg-white",
          children: BxColumn({
            children: [
              HtmlH2({
                className:
                  "text-3xl font-semibold text-center mb-8 text-[#34495e]",
                children: "Why Choose FinTechHub?",
              }),
              BxRow({
                className: "flex justify-center gap-6 mb-6",
                children: [
                  Box({
                    className:
                      "bg-[#16a085] text-white p-12 rounded-lg text-center",
                    children: HtmlH2({
                      className: "text-2xl",
                      children: "Real-Time Analytics",
                    }),
                  }),
                  Box({
                    className:
                      "bg-[#3498db] text-white p-12 rounded-lg text-center",
                    children: HtmlH2({
                      className: "text-2xl",
                      children: "Complete Security",
                    }),
                  }),
                  Box({
                    className:
                      "bg-[#f39c12] text-white p-12 rounded-lg text-center",
                    children: HtmlH2({
                      className: "text-2xl",
                      children: "Seamless Transactions",
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      }),

      // Call to Action Section
      Box({
        key: "cta",
        children: BxRow({
          className: "justify-center px-6 py-16 bg-[#ecf0f1]",
          children: BxColumn({
            children: [
              HtmlH2({
                className:
                  "text-3xl font-semibold text-center mb-6 text-[#34495e]",
                children: "Ready to Get Started?",
              }),
              HtmlP({
                className: "text-lg text-[#7f8c8d] mb-6 text-center",
                children:
                  "Join thousands of others in achieving your financial goals. Start now with FinTechHub.",
              }),
              Button({
                className:
                  "bg-blue-600 text-white px-8 py-3 rounded-full text-xl hover:bg-blue-500",
                children: "Sign Up Now",
                onClick: toggleSignupModal,
              }),
            ],
          }),
        }),
      }),

      // Footer Section
      Box({
        key: "footer",
        children: BxRow({
          className: "justify-between px-6 py-8 bg-[#34495e] text-white",
          children: [
            HtmlP({
              className: "text-white",
              children: "© 2025 FinTechHub. All rights reserved.",
            }),
            BxRow({
              className: "flex gap-6 items-center",
              children: [
                HtmlP({
                  className: "cursor-pointer hover:underline text-white",
                  children: "Privacy Policy",
                }),
                HtmlP({
                  className: "cursor-pointer hover:underline text-white",
                  children: "Terms of Service",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
};

export default LandingPage;
