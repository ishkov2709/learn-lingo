"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { FiBookOpen } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";
import useAllSelectors from "@/utils/useAllSelectors";
import clsx from "clsx";
import BtnLink from "../btn-link";
import { useAppDispatch } from "@/redux/hooks";
import { addToFavorites, deleteFromFavorites } from "@/redux/teachers/thunk";

export interface ReviewTeacher {
  comment: string;
  reviewer_name: string;
  reviewer_rating: number;
}

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
  reviews?: ReviewTeacher[];
  followers?: string[];
  favorites?: string[];
}

const Card = ({
  data: {
    _id,
    avatar_url,
    name,
    surname,
    languages,
    lesson_info,
    conditions,
    experience,
    levels,
    lessons_done,
    rating,
    price_per_hour,
    reviews,
    favorites,
  },
}: {
  data: TeacherProps;
}) => {
  const { currentTheme, isLoading, userToken, userId } = useAllSelectors();
  const [isShow, setShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    dispatch(addToFavorites(_id));
  };

  const handleDelete = () => {
    dispatch(deleteFromFavorites(_id));
  };

  return (
    <li className={styles.cardItem}>
      <Image
        className={clsx(styles.avatar, styles[currentTheme + "Border"])}
        src={avatar_url}
        alt="teacher"
        width={96}
        height={96}
        priority
      />
      <div className={styles.rightSideWrapper}>
        <p className={styles.subtitleText}>
          Languages{" "}
          <span className={styles.name}>
            {name} {surname}
          </span>
        </p>
        <p className={styles.subtitleText}>
          Speaks:{" "}
          <span className={styles.aboutText}>{languages.join(" ")}</span>
        </p>
        <p className={styles.subtitleText}>
          Lesson Info: <span className={styles.aboutText}>{lesson_info}</span>
        </p>
        <p className={clsx(styles.subtitleText, styles.last)}>
          Conditions:{" "}
          <span className={styles.aboutText}>{conditions.join(" ")}</span>
        </p>

        {!isShow ? (
          <button
            type="button"
            className={styles.moreBtn}
            onClick={() => setShow(true)}
          >
            Read more
          </button>
        ) : (
          <>
            <p className={styles.experience}>{experience}</p>

            {reviews && reviews.length > 0 && (
              <ul>
                {reviews.map((review, i) => (
                  <li key={i} className={styles.reviewItem}>
                    <p className={styles.reviewName}>{review.reviewer_name}</p>
                    <p className={styles.reviewRating}>
                      <FaStar size={16} color="#FFC531" />
                      {review.reviewer_rating.toFixed(1)}
                    </p>
                    <p>{review.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        <ul className={styles.levelList}>
          {levels.map((el, i) => (
            <li key={i} className={styles.levelItem}>
              {"#" + el}
            </li>
          ))}
        </ul>

        {userToken && (
          <BtnLink href={`/teachers/${_id}`} className="mt-8">
            Book trial lesson
          </BtnLink>
        )}

        <div className={styles.extaInfoWrapper}>
          <p className={styles.extraText}>
            <FiBookOpen size={16} color="inherit" /> Lessons online
          </p>
          <p className={styles.extraText}>Lessons done: {lessons_done}</p>
          <p className={styles.extraText}>
            <FaStar size={16} color="#FFC531" /> Rating: {rating}
          </p>
          <p className={styles.extraText}>
            Price / 1 hour:{" "}
            <span className={styles.price}>{price_per_hour}$</span>
          </p>

          {userId && favorites?.includes(userId) && (
            <button
              className={styles.favBtn}
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
            >
              <FaHeart size={24} color="#121417" />
            </button>
          )}
          {userId && !favorites?.includes(userId) && (
            <button
              className={styles.favBtn}
              type="button"
              onClick={handleAdd}
              disabled={isLoading}
            >
              <FaRegHeart size={24} color="#121417" />
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default Card;
