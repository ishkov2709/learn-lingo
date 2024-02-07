"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useAppSelector } from "@/redux/hooks";
import { FiBookOpen } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import Link from "next/link";

export interface TeacherProps {
  _id: string;
  avatar_url: string;
  name: string;
  surname: string;
  languages: string[];
  lesson_info: string;
  conditions: string[];
  experience: string;
  levels: string[];
  lessons_done: number;
  rating: number;
  price_per_hour: number;
  followers?: string[];
}

const Card = ({ data }: { data: TeacherProps }) => {
  const currentTheme = useAppSelector((state) => state.themes.currentTheme);

  return (
    <li className={styles.cardItem}>
      <Image
        className={`${styles.avatar} ${styles[currentTheme + "Border"]}`}
        src={data.avatar_url}
        alt="teacher"
        width={96}
        height={96}
        priority
      />
      <div className={styles.rightSideWrapper}>
        <p className={styles.subtitleText}>
          Languages{" "}
          <span className={styles.name}>
            {data.name} {data.surname}
          </span>
        </p>
        <p className={styles.subtitleText}>
          Speaks:{" "}
          <span className={styles.aboutText}>{data.languages.join(" ")}</span>
        </p>
        <p className={styles.subtitleText}>
          Lesson Info:{" "}
          <span className={styles.aboutText}>{data.lesson_info}</span>
        </p>
        <p className={styles.subtitleText}>
          Conditions:{" "}
          <span className={styles.aboutText}>{data.conditions.join(" ")}</span>
        </p>

        <Link
          href={`/teachers/${data._id}`}
          className={styles.moreBtn}
          scroll={false}
        >
          Read more
        </Link>

        <ul className={styles.levelList}>
          {data.levels.map((el, i) => (
            <li key={i} className={styles.levelItem}>
              {"#" + el}
            </li>
          ))}
        </ul>

        <div className={styles.extaInfoWrapper}>
          <p className={styles.extraText}>
            <FiBookOpen size={16} color="inherit" /> Lessons online
          </p>
          <p className={styles.extraText}>Lessons done: {data.lessons_done}</p>
          <p className={styles.extraText}>
            <FaStar size={16} color="#FFC531" /> Rating: {data.rating}
          </p>
          <p className={styles.extraText}>
            Price / 1 hour:{" "}
            <span className={styles.price}>{data.price_per_hour}$</span>
          </p>

          <button className={styles.favBtn} type="button">
            <FaRegHeart size={26} color="#121417" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default Card;
