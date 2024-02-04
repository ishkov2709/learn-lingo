import React from "react";

export const metadata = {
  title: "LearnLingo | Teachers",
};

export default function Layout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  list: React.ReactNode;
}>) {
  return (
    <>
      <main
        style={{ backgroundColor: "#F8F8F8", minHeight: "calc(100% - 88px)" }}
      >
        <section className="pt-8 pb-16">
          <div className="container">{children}</div>
        </section>
      </main>
      {modal}
    </>
  );
}
