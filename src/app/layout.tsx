import { Roboto } from "next/font/google";
import type { Metadata } from "next";
import StoreProvider from "./provider";
import "./globals.css";
import Header from "@/components/header";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

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
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
