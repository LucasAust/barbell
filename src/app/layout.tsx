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
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Hard-coded theme-color fallback — belt AND suspenders for iOS 26 liquid glass */}
        <meta name="theme-color" content="#080808" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#080808" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#080808" />
      </head>
      <body className="antialiased">
        {/* Nuclear option: permanent solid black strip at top — covers status bar,
            URL bar, safe area, whatever iOS puts there. Always. No exceptions. */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: '#080808',
          zIndex: 9998,
          pointerEvents: 'none',
        }} aria-hidden="true" />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
