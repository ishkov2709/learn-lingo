import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/components/header";
import "./globals.css";

const roboto = Roboto({ weight: ["400", "500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LearnLingo",
  description: "Unlock your potential with the best language tutors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
