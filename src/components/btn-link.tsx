import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { ReactNode } from "react";
import style from "./btn-link.module.css";

interface IProps {
  href: string;
  children: ReactNode;
}

export const BtnLink = ({ href, children }: IProps) => {
  const currentTheme = useAppSelector((state) => state.themes.currentTheme);

  return (
    <Link className={`${style.btnLink} ${style[currentTheme]}`} href={href}>
      {children}
    </Link>
  );
};
