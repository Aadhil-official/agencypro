import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CosmicAnalyticsProvider } from "cosmic-analytics";
import { AuthProvider } from "cosmic-authentication";

const primaryFont = Geist({
  weight: ["400", "600", "700"],
  subsets: ["latin"]
});

// Change the title and description to your own.
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://example.com"),
  title: {
    default: "AgencyPro — Foreign Employment Agency",
    template: "%s — AgencyPro"
  },
  description: "Trusted foreign employment agency offering overseas job placement, visa & work permits, and pre-departure training.",
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html data-editor-id="app/layout.tsx:27:5" lang="en" className={primaryFont.className}>
      <body data-editor-id="app/layout.tsx:31:7" className="antialiased">
        <AuthProvider>
          <main data-editor-id="app/layout.tsx:32:9" className="min-h-screen">
            <CosmicAnalyticsProvider>
              {children}
            </CosmicAnalyticsProvider>
          </main>
        </AuthProvider>
        {process.env.VISUAL_EDITOR_ACTIVE === 'true' &&
        <script data-editor-id="app/layout.tsx:50:9" src="/editor.js" async />
        }
      </body>
    </html>);

}