import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

interface IProps {
  href: string;
  className?: string;
  handler?: () => void;
  children: ReactNode;
}

const BtnLink = ({ href, className, handler = () => {}, children }: IProps) => {
  const currentTheme = useAppSelector((state) => state.themes.currentTheme);

  return (
    <Link
      className={clsx(styles.btnLink, styles[currentTheme], `${className}`)}
      href={href}
      scroll={false}
      onClick={handler}
    >
      {children}
    </Link>
  );
};

export default BtnLink;
