import Image from "next/image";
import style from "./card.module.css";
import { useAppSelector } from "@/redux/hooks";
import { FiBookOpen } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

interface IProps {
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
}

export const Card = ({ data }: { data: IProps }) => {
  const currentTheme = useAppSelector((state) => state.themes.currentTheme);

  console.log(data);

  return (
    <li className={style.cardItem}>
      <Image
        className={`${style.avatar} ${style[currentTheme + "Border"]}`}
        src={data.avatar_url}
        alt="teacher"
        width={96}
        height={96}
        priority
      />
      <div className={style.rightSideWrapper}>
        <p className={style.subtitleText}>
          Languages{" "}
          <span className={style.name}>
            {data.name} {data.surname}
          </span>
        </p>
        <p className={style.subtitleText}>
          Speaks:{" "}
          <span className={style.aboutText}>{data.languages.join(" ")}</span>
        </p>
        <p className={style.subtitleText}>
          Lesson Info:{" "}
          <span className={style.aboutText}>{data.lesson_info}</span>
        </p>
        <p className={style.subtitleText}>
          Conditions:{" "}
          <span className={style.aboutText}>{data.conditions.join(" ")}</span>
        </p>

        <button className={style.moreBtn} type="button">
          Read more
        </button>

        <ul className={style.levelList}>
          {data.levels.map((el, i) => (
            <li key={i} className={style.levelItem}>
              {"#" + el}
            </li>
          ))}
        </ul>

        <div className={style.extaInfoWrapper}>
          <p className={style.extraText}>
            <FiBookOpen size={16} color="inherit" /> Lessons online
          </p>
          <p className={style.extraText}>Lessons done: {data.lessons_done}</p>
          <p className={style.extraText}>
            <FaStar size={16} color="#FFC531" /> Rating: {data.rating}
          </p>
          <p className={style.extraText}>
            Price / 1 hour:{" "}
            <span className={style.price}>{data.price_per_hour}$</span>
          </p>

          <button className={style.favBtn} type="button">
            <CiHeart size={26} color="#121417" />
          </button>
        </div>
      </div>
    </li>
  );
};
