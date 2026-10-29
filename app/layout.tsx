import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next";
import { site } from "@/data";

import "./globals.css";
import StyledComponentsRegistry from "./src/providers/StyledComponentsRegistry";
import ThemeProvider from "./src/providers/ThemeProvider";

// The Open Graph / Twitter image comes from app/opengraph-image.jpg and app/twitter-image.jpg
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  keywords: ["Martin Espericueta", "Software Engineer", "Frontend Developer", "React", "TypeScript", "Portfolio"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#245DDA",
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
