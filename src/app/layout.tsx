import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#080808",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
