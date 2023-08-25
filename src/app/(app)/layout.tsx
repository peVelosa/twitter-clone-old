import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

/**
 * Global Provider
 */

import Providers from "../Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
