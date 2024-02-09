import Link from "next/link";
import styles from "./styles.module.css";
import useAllSelectors from "@/utils/useAllSelectors";
import { LuLogIn } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { themeSwitcher } from "@/utils/themeSwitcher";
import { useEffect, useState } from "react";

export default function AuthBtns() {
  const { currentTheme } = useAllSelectors();
  const pathname = usePathname();
  const [segmentPath, setSegmentPath] = useState<string>("");

  useEffect(() => {
    const arrayPath = pathname.split("/").filter((el) => el !== "");
    setSegmentPath(
      !arrayPath.includes("login") &&
        !arrayPath.includes("register") &&
        arrayPath.length === 1
        ? pathname
        : ""
    );
  }, [pathname]);

  return (
    <ul className={styles.authList}>
      <li>
        <Link
          className={styles.loginLink}
          scroll={false}
          href={segmentPath + "/login"}
        >
          <LuLogIn color={themeSwitcher(currentTheme).primaryColor} size={20} />
          Log in
        </Link>
      </li>
      <li>
        <Link
          className={styles.registerLink}
          scroll={false}
          href={segmentPath + "/register"}
        >
          Registration
        </Link>
      </li>
    </ul>
  );
}
