import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Basket Configurator",
    template: "%s | Basket Configurator",
  },
  description:
    "Design customizable 3D-printable baskets in your browser. Adjust dimensions, wall patterns, handles, and export ready-to-print STL files instantly.",
  keywords: [
    "3D printing",
    "basket generator",
    "STL generator",
    "parametric design",
    "CAD web app",
    "basket configurator",
    "3D model generator",
    "printable basket design",
  ],
  authors: [{ name: "Salinder Sidhu" }],
  creator: "Salinder Sidhu",
  publisher: "Salinder Sidhu",

  metadataBase: new URL("https://basket-configurator.vercel.app/"),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Basket Configurator",
    description:
      "Design customizable 3D-printable baskets in your browser. Export ready-to-print STL files instantly.",
    url: "https://basket-configurator.vercel.app/",
    siteName: "Basket Configurator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Basket Configurator preview",
      },
    ],
    locale: "en_CA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Basket Configurator",
    description:
      "Design and export customizable 3D-printable baskets directly in your browser.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
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
