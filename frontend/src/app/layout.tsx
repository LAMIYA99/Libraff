import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/Main/MainLayout";

const NunitoFont = Nunito({
  variable: "--font-Nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Libraff - Onlayn Kitab Mağazası ",
  description: "Libraff - Onlayn Kitab Mağazası",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${NunitoFont.variable} antialiased`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
