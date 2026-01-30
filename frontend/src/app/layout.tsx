import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/provider/LoadingProvider";
import TanstackQueryProvider from "@/provider/TanstackQueryProvider";
import { Toaster } from "react-hot-toast";

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
        <TanstackQueryProvider>
          <LoadingProvider>
            {children}
            <Toaster />
          </LoadingProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
