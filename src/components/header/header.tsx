"use client";

import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import Link from "next/link";
import styles from "./styles.module.css";
import AuthBtns from "../auth-btns/auth-btns";
import ThemesSelector from "../themes-selector";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { useAppDispatch } from "@/redux/hooks";
import { currentUser, logoutUser } from "@/redux/user/thunk";

const Header = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getCookie("user-token") ?? "";
    token && dispatch(currentUser(token));
    dispatch(logoutUser());
  }, [dispatch]);

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
              <Link className={styles.navLink} href="/home">
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

        <AuthBtns />
      </div>
    </header>
  );
};

export default Header;
