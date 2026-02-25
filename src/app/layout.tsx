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
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Solid black fill behind the iOS safe-area / status-bar — always on top of everything */}
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 'env(safe-area-inset-top)',
            backgroundColor: '#080808',
            zIndex: 9999,
          }}
        />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
