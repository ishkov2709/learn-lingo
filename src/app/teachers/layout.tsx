import { ReactNode } from "react";

interface IProps {
  modal: ReactNode;
  children: ReactNode;
}

export default function Layout({ modal, children }: IProps) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
