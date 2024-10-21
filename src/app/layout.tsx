import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Doe - Portfolio",
  description: "Full Stack Developer & UI/UX Enthusiast",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

