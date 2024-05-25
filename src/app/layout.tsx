import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { env } from "process";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "geDem Blog",
  description:
    "現役エンジニアによるテックブログです。主にフロントエンド・モバイル(iOS/Android)を中心に、機能の実装方法・デバッグ方法を紹介します。",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION_CODE,
  },
  icons: {
    icon: "/src/app/icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
        `,
        }}
      />

      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
