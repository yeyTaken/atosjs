import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "AtosJS",
  description: "AtosJS, It´s a complex and adventure-filled book!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
};