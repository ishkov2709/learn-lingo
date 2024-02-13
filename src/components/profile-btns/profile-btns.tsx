import { useAppDispatch } from "@/redux/hooks";
import { logoutUser } from "@/redux/user/thunk";
import Link from "next/link";
import styles from "./styles.module.css";
import { MdLogout } from "react-icons/md";
import { themeSwitcher } from "@/utils/themeSwitcher";
import useAllSelectors from "@/utils/useAllSelectors";
import { use, useEffect } from "react";
import { redirect, usePathname } from "next/navigation";

export interface PageProps {}

export default function ProfileBtns() {
  const { currentTheme } = useAllSelectors();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <ul className={styles.list}>
      <li>
        <Link href="/favorites">Favorites</Link>
      </li>
      <li>
        <button
          className={styles.logoutBtn}
          type="button"
          onClick={handleLogout}
        >
          Logout{" "}
          <MdLogout
            color={themeSwitcher(currentTheme).primaryColor}
            size={20}
          />
        </button>
      </li>
    </ul>
  );
}
