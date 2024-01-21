"use client";

import Image from "next/image";
import style from "./home.module.css";
import { useAppSelector } from "@/redux/hooks";
import { themeSwitcher } from "@/utils/themeSwitcher";
import { BtnLink } from "@/components/btn-link";
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
      <section className={style.heroSection}>
        <div className={`container ${style.container}`}>
          <div className={style.aboutWrapper}>
            <h1 className={style.title}>
              Unlock your potential with the best{" "}
              <span
                className={style.accent}
                style={{
                  backgroundColor: themeSwitcher(currentTheme).secondaryColor,
                }}
              >
                language
              </span>{" "}
              tutors
            </h1>

            <p className={style.text}>
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
          <div className={`${style.statsWrapper} ${style[currentTheme]}`}>
            <ul className={style.statList}>
              <li className={style.statItem}>
                <p className={style.statCount}>32,000 +</p>
                <p className={style.statName}>Experienced tutors</p>
              </li>
              <li className={style.statItem}>
                <p className={style.statCount}>300,000 +</p>
                <p className={style.statName}>5-star tutor reviews</p>
              </li>
              <li className={style.statItem}>
                <p className={style.statCount}>120 +</p>
                <p className={style.statName}>Subjects taught</p>
              </li>
              <li className={style.statItem}>
                <p className={style.statCount}>200 +</p>
                <p className={style.statName}>Tutor nationalities</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

// VPHG2Qx9yfb9RGx4;
