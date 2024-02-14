import React from "react";
import styles from "./styles.module.css";

export interface FiltersFormProps {
  children?: React.ReactNode;
}

export default function FiltersForm({ children }: FiltersFormProps) {
  return <form className={styles.form}>{children}</form>;
}
