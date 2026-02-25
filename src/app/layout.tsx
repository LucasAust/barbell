import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "Gamecock Barbell Club | University of South Carolina",
  description:
    "The official powerlifting club of the University of South Carolina. Competitor, meet, and community information for the Gamecock Barbell Club.",
  openGraph: {
    title: "Gamecock Barbell Club",
    description: "Lift Heavy. Compete Hard. Represent USC.",
    siteName: "Gamecock Barbell Club",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#080808" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
