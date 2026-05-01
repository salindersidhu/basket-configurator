import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Basket Configurator",
  description:
    "Design printable baskets in the browser—dimensions, patterns, handles—and export STL for your slicer.",
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
