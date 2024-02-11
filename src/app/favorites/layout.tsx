import React from "react";

export const metadata = {
  title: "LearnLingo | Favorites",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
