import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Basket Configurator",
  description:
    "Design printable baskets in your browser. Customize dimensions, wall patterns, handles, and export ready-to-print STL files.",
  keywords: [
    "3D printing",
    "basket generator",
    "STL generator",
    "parametric design",
    "CAD web app",
    "basket configurator",
  ],
  authors: [{ name: "Salinder Sidhu" }],
  creator: "Salinder Sidhu",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden bg-bg text-txt antialiased">
        <div className="h-full min-h-0">{children}</div>
      </body>
    </html>
  );
}
