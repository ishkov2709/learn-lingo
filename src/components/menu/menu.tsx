import clsx from "clsx";
import styles from "./styles.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import useAllSelectors from "@/utils/useAllSelectors";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { logoutUser } from "@/redux/user/thunk";
import ThemesSelector from "../themes-selector";

interface MenuProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Menu({ isOpen, setOpen }: MenuProps) {
  const { userToken } = useAllSelectors();
  const pathname = usePathname();
  const [segmentPath, setSegmentPath] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    setOpen(false);
    const arrayPath = pathname.split("/").filter((el) => el !== "");
    setSegmentPath(
      !arrayPath.includes("login") &&
        !arrayPath.includes("register") &&
        arrayPath.length === 1
        ? pathname
        : ""
    );
  }, [pathname]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={clsx(styles.menu, isOpen ? styles.active : styles.hidden)}>
      <button onClick={() => setOpen(false)} className={styles.closeBtn}>
        <IoMdClose size={28} />
      </button>
      <ul className={styles.navList}>
        <li>
          <Link href="/home">Home</Link>
        </li>
        <li>
          <Link href="/teachers">Teachers</Link>
        </li>
        {!userToken ? (
          <>
            <li>
              <Link href={segmentPath + "/login"}>Login</Link>
            </li>
            <li>
              <Link href={segmentPath + "/register"}>Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={"/favorites"}>Favorites</Link>
            </li>
            <li>
                <button type="button" onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>

      <ThemesSelector isSearchable={false} />
    </div>
  );
}
