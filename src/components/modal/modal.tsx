"use client";

import React, { useRef } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";

interface ModalProps {
  children?: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const overlay = useRef(null);
  const router = useRouter();

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
    </div>
  );
};

export default Modal;
