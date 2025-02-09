import { Metadata } from "next";

import Footer from "@/components/footer";
import Header from "@/components/header";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "AtosJS - Your imagination is the limit.",
  description: "AtosJS is a JavaScript library that simplifies event management. Its main class, GiftManager, handles the distribution of virtual rewards, efficiently controlling the delivery and validity of prizes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-950">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
