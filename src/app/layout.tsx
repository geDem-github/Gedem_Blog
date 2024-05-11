import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "geDem Blog",
  description:
    "現役エンジニアによるテックブログです。主にフロントエンド・モバイル(iOS/Android)を中心に、機能の実装方法・デバッグ方法を紹介します。",
  verification: {
    google: process.env["GOOGLE_SITE_VERIFICATION_CODE"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
