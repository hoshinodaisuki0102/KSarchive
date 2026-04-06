import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KSarchive",
  description: "경신고등학교 내신 대비용 학습 아카이브"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}