import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from "./src/providers/StyledComponentsRegistry";
import ThemeProvider from "./src/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Martin Espericueta",
  description: "Martin Espericueta, a frontend-focused Software Engineer. Explore my experience, skills, and projects in a Windows XP-style portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
        <Analytics />
      </body>
    </html>
  );
}
