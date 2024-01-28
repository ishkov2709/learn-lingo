"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useAppSelector } from "@/redux/hooks";
import { themeSwitcher } from "@/utils/themeSwitcher";
import BtnLink from "@/components/btn-link";
import yellow from "../../public/images/hero/yellow.png";
import green from "../../public/images/hero/green.png";
import blue from "../../public/images/hero/blue.png";
import pink from "../../public/images/hero/pink.png";
import peach from "../../public/images/hero/peach.png";

const images = {
  yellow: yellow,
  green: green,
  blue: blue,
  pink: pink,
  peach: peach,
};

export default function Home() {
  const currentTheme = useAppSelector((state) => state.themes.currentTheme);

  return (
    <main>
      <section className={styles.heroSection}>
        <div className={`container ${styles.container}`}>
          <div className={styles.aboutWrapper}>
            <h1 className={styles.title}>
              Unlock your potential with the best{" "}
              <span
                className={styles.accent}
                style={{
                  backgroundColor: themeSwitcher(currentTheme).secondaryColor,
                }}
              >
                language
              </span>{" "}
              tutors
            </h1>

            <p className={styles.text}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>

            <BtnLink href="/">Get started</BtnLink>
          </div>
          <Image
            src={images[currentTheme]}
            alt="girl"
            width={568}
            height={530}
          />
        </div>
      </section>
      <section>
        <div className="container">
          <div className={`${styles.statsWrapper} ${styles[currentTheme]}`}>
            <ul className={styles.statList}>
              <li className={styles.statItem}>
                <p className={styles.statCount}>32,000 +</p>
                <p className={styles.statName}>Experienced tutors</p>
              </li>
              <li className={styles.statItem}>
                <p className={styles.statCount}>300,000 +</p>
                <p className={styles.statName}>5-star tutor reviews</p>
              </li>
              <li className={styles.statItem}>
                <p className={styles.statCount}>120 +</p>
                <p className={styles.statName}>Subjects taught</p>
              </li>
              <li className={styles.statItem}>
                <p className={styles.statCount}>200 +</p>
                <p className={styles.statName}>Tutor nationalities</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

// VPHG2Qx9yfb9RGx4;
