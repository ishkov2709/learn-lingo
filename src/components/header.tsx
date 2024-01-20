import Image from "next/image";
import logo from "../../public/images/logo.svg";
import style from "./header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className={`container ${style.containerHeader}`}>
        <span className={style.logoWrapper}>
          <Image src={logo} alt="flag-ukraine" width={28} height={28} />
          <p>LearnLingo</p>
        </span>

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
            <Link href="/login">Log in</Link>
          </li>
          <li>
            <Link href="/register">Registration</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
