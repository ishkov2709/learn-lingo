import Image from "next/image";
import style from "./card.module.css";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

interface IProps {
  avatar_url: string;
  name: string;
  surname: string;
  languages: string[];
  lesson_info: string;
  conditions: string[];
  experience: string;
}

export const Card = ({ data }: { data: IProps }) => {
  const currentTheme = useAppSelector((state) => state.themes.currentTheme);

  console.log(data);

  return (
    <li className={style.item}>
      <Image
        className={`${style.avatar} ${style[currentTheme + "Border"]}`}
        src={data.avatar_url}
        alt="teacher"
        width={96}
        height={96}
        priority
      />
      <div className={style.rightSideWrapper}>
        <p>
          Languages{" "}
          <span>
            {data.name} {data.surname}
          </span>
        </p>
        <p>
          Speaks: <span>{data.languages.join(" ")}</span>
        </p>
        <p>
          Lesson Info: <span>{data.lesson_info}</span>
        </p>
        <p>
          Conditions: <span>{data.conditions.join(" ")}</span>
        </p>

        <Link href="/">Read more</Link>
      </div>
    </li>
  );
};
