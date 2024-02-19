import Link from "next/link";
import { ReactNode } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import useAllSelectors from "@/utils/useAllSelectors";

interface IProps {
  href: string;
  className?: string;
  handler?: () => void;
  children: ReactNode;
}

const BtnLink = ({
  href,
  className = "",
  handler = () => {},
  children,
}: IProps) => {
  const { currentTheme } = useAllSelectors();

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
