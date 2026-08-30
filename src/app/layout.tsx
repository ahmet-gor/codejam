import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProvider } from "@/lib/store";
import { ThemeProvider, themeInitScript } from "@/lib/theme";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AmberStream — Cloud Gaming, Instantly",
    template: "%s — AmberStream",
  },
  description:
    "Play AAA games on any device in seconds. No downloads, no patches, no hardware. Just press play.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <AppProvider>
            {children}
            <Toaster position="bottom-right" />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
