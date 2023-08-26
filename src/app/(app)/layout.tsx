import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

/**
 * Global Provider
 */

import Providers from "../Providers";
import Sidebar from "@/components/Sidebar/Sidebar";
import Modal from "@/components/Modal/Modal";
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
      <body className={`${inter.className} overflow-x-hidden`}>
        <div className="min-h-screen w-screen bg-gray-900 text-white">
          <div className="mx-auto flex w-full max-w-4xl gap-2 overflow-x-hidden">
            <Providers>
              <Sidebar />
              <main className="w-full border-x-[1px] border-gray-500">
                {children}
              </main>
            </Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
