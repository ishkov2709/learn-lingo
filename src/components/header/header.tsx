"use client";

import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import styles from "./styles.module.css";
import Link from "next/link";
import { LuLogIn } from "react-icons/lu";
import { useAppSelector } from "@/redux/hooks";
import ThemesSelector from "../themes-selector";
import { themeSwitcher } from "@/utils/themeSwitcher";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const currentTheme = useAppSelector((state) => state.themes.currentTheme);
  const pathname = usePathname();
  const [segmentPath, setSegmentPath] = useState<string>("/");

  useEffect(() => {
    setSegmentPath(pathname.length > 1 ? pathname : "");
  }, [pathname]);

  return (
    <header>
      <div className={`container ${styles.containerHeader}`}>
        <div>
          <span className={styles.logoWrapper}>
            <Image src={logo} alt="flag-ukraine" width={28} height={28} />
            <p>LearnLingo</p>
          </span>
        </div>

        <ThemesSelector />

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link className={styles.navLink} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={styles.navLink} href="/teachers">
                Teachers
              </Link>
            </li>
          </ul>
        </nav>

        <ul className={styles.authList}>
          <li>
            <Link className={styles.loginLink} href={segmentPath + "/login"}>
              <LuLogIn
                color={themeSwitcher(currentTheme).primaryColor}
                size={20}
              />
              Log in
            </Link>
          </li>
          <li>
            <Link
              className={styles.registerLink}
              href={segmentPath + "/register"}
            >
              Registration
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
