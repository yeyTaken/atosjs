import type { Metadata } from "next";

import "./globals.css";
import { Footer } from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: "AtosJS",
  description: "AtosJS, It's a complex and adventure-filled book!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {children}
        <Footer />
      </body>
    </html>
  );
}
