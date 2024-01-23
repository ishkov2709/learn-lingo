"use client";

import Image from "next/image";
import logo from "../../public/images/logo.svg";
import style from "./header.module.css";
import Link from "next/link";
import { LuLogIn } from "react-icons/lu";
import { useAppSelector } from "@/redux/hooks";
import ThemesSelector from "./themes-selector";
import { themeSwitcher } from "@/utils/themeSwitcher";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const currentTheme = useAppSelector((state) => state.themes.currentTheme);
  const pathname = usePathname();
  const [segmentPath, setSegmentPath] = useState<string>("/home");

  useEffect(() => {
    setSegmentPath(
      "/" +
        pathname
          .split("/")
          .find((path) => path === "home" || path === "teachers")
    );
  }, [pathname]);

  return (
    <header>
      <div className={`container ${style.containerHeader}`}>
        <div>
          <span className={style.logoWrapper}>
            <Image src={logo} alt="flag-ukraine" width={28} height={28} />
            <p>LearnLingo</p>
          </span>
        </div>

        <ThemesSelector />

        <nav className={style.nav}>
          <ul className={style.navList}>
            <li>
              <Link className={style.navLink} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={style.navLink} href="/teachers">
                Teachers
              </Link>
            </li>
          </ul>
        </nav>

        <ul className={style.authList}>
          <li>
            <Link className={style.loginLink} href={"/login"}>
              <LuLogIn
                color={themeSwitcher(currentTheme).primaryColor}
                size={20}
              />
              Log in
            </Link>
          </li>
          <li>
            <Link className={style.registerLink} href={"/register"}>
              Registration
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
