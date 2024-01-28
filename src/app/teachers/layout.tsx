import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function Layout({ children, modal }: IProps) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
