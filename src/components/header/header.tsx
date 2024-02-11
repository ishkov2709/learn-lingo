"use client";

import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import Link from "next/link";
import styles from "./styles.module.css";
import ThemesSelector from "../themes-selector";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { useAppDispatch } from "@/redux/hooks";
import { currentUser, logoutUser } from "@/redux/user/thunk";
import AuthBtns from "../auth-btns/auth-btns";
import ProfileBtns from "../profile-btns";
import useAllSelectors from "@/utils/useAllSelectors";
import { setRefreshing } from "@/redux/user/userSlice";
import { ThreeDots } from "react-loader-spinner";
import { themeSwitcher } from "@/utils/themeSwitcher";

const Header = () => {
  const dispatch = useAppDispatch();
  const { userToken, isRefreshing, currentTheme } = useAllSelectors();

  useEffect(() => {
    const token = getCookie("user-token") ?? "";
    if (token) dispatch(currentUser(token));
    if (!token) dispatch(setRefreshing());
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

        <div className="w-24">
          {isRefreshing && userToken && <ProfileBtns />}
          {isRefreshing && !userToken && <AuthBtns />}
          {!isRefreshing && (
            <ThreeDots
              visible={true}
              height="60"
              width="60"
              color={themeSwitcher(currentTheme).primaryColor}
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
