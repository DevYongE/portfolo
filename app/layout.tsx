import type { Metadata } from "next";
import { Outfit, Noto_Sans_KR, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = `${profile.name} (${profile.handle}) · 포트폴리오`;
const description = `${profile.identity}. ${profile.heroSub}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://devyonge.dev"),
  title,
  description,
  keywords: [
    "최대용",
    "DevYongE",
    "OnMemoryLabs",
    "Flutter",
    "Next.js",
    "Supabase",
    "풀스택 개발자",
    "포트폴리오",
  ],
  authors: [{ name: `${profile.name} (${profile.handle})` }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title,
    description,
    siteName: `${profile.name} 포트폴리오`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${outfit.variable} ${notoSansKr.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
