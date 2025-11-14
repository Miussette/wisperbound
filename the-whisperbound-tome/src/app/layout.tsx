import type { Metadata } from "next";
import { Crimson_Text, IM_Fell_English } from "next/font/google";
import "./globals.css";

const crimsonText = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-crimson",
});

const imFell = IM_Fell_English({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-fell",
});

export const metadata: Metadata = {
  title: "The Whisperbound Tome",
  description: "A silent book that answers when spoken to",
  icons: {
    icon: "/whisperbound.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${crimsonText.variable} ${imFell.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
