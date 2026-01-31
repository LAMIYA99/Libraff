import { Nunito } from "next/font/google";
import "../globals.css";
import { LoadingProvider } from "@/provider/LoadingProvider";
import TanstackQueryProvider from "@/provider/TanstackQueryProvider";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { AuthProvider } from "@/context/AuthContext";

const NunitoFont = Nunito({
  variable: "--font-Nunito",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${NunitoFont.variable} antialiased`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <TanstackQueryProvider>
            <CartProvider>
              <WishlistProvider>
                <LoadingProvider>
                  <AuthProvider>
                    {children}
                    <Toaster />
                  </AuthProvider>
                </LoadingProvider>
              </WishlistProvider>
            </CartProvider>
          </TanstackQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
