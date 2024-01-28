import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./styles.module.css";

interface IProps {
  href: string;
  children: ReactNode;
}

const BtnLink = ({ href, children }: IProps) => {
  const currentTheme = useAppSelector((state) => state.themes.currentTheme);

  return (
    <Link className={`${styles.btnLink} ${styles[currentTheme]}`} href={href}>
      {children}
    </Link>
  );
};

export default BtnLink;
