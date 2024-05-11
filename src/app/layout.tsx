import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "geDem Blog",
  description:
    "現役エンジニアによるテックブログです。主にフロントエンド・モバイル(iOS/Android)を中心に、機能の実装方法・デバッグ方法を紹介します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
