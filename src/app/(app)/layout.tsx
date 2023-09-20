import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

/**
 * Global Provider
 */

import Providers from "./Providers";
import Sidebar from "@/components/Sidebar/Sidebar";
import Link from "next/link";
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
      <body className={`${inter.className} overflow-x-hidden text-white`}>
        <div className="min-h-screen w-screen bg-gray-900 pb-8">
          <div className="mx-auto flex w-full max-w-4xl gap-2 overflow-x-hidden">
            <Providers>
              <Sidebar />
              <div className="w-full">
                <main className="border-x border-gray-500">{children}</main>
                <footer className="text-center mt-8">
                  Designed and developed by{" "}
                  <Link
                    href={"https://github.com/peVelosa"}
                    className="text-gray-400"
                  >
                    @Pedro Velosa
                  </Link>
                </footer>
              </div>
            </Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
