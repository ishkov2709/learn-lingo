import clsx from "clsx";
import styles from "./styles.module.css";
import { Dispatch, SetStateAction } from "react";

interface MenuProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Menu({ isOpen, setOpen }: MenuProps) {
  return (
    <div className={clsx(styles.menu, isOpen ? styles.active : styles.hidden)}>
      <button onClick={() => setOpen((prev) => !prev)}>close</button>
      <br />
      <p>lorem</p>
      <p>lorem</p>
      <p>lorem</p>
      <p>lorem</p>
      <p>lorem</p>
    </div>
  );
}
