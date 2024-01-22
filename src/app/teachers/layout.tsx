import { ReactNode } from "react";

interface IPhotoFeedLayout {
  modal: ReactNode;
  children: ReactNode;
}

export default function Layout({ modal, children }: IPhotoFeedLayout) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
