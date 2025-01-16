import type { Metadata } from "next";

import { SideBar } from '@/components/SideBar/SideBar';
import "./globals.css";

export const metadata: Metadata = {
  title: "AtosJS - Guide",
  description: "guide for AtosJS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SideBar/>

        {children}
      </body>
    </html>
  );
};