"use client";

import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ModalProps {
  children?: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const overlay = useRef(null);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  });

  const handleClick = (e: React.SyntheticEvent<EventTarget>) => {
    e.target === overlay.current && router.back();
  };

  return (
    <div ref={overlay} className={styles.overlay} onClick={handleClick}>
      <div className={styles.modal}>
        <IoCloseSharp
          size={32}
          className={styles.closeIcon}
          onClick={() => router.back()}
        />
        {children}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Modal;
