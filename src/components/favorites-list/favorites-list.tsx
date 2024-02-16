"use client";

import useAllSelectors from "@/utils/useAllSelectors";
import { useEffect } from "react";
import Card from "../card";
import { getFavorites, getTeachers } from "@/redux/teachers/thunk";
import { useAppDispatch } from "@/redux/hooks";
import styles from "./styles.module.css";

export default function FavoritesList() {
  const { teachers, favorites, isLoading, isRefreshing, userToken } =
    useAllSelectors();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  useEffect(() => {
    if (teachers && userToken) {
      dispatch(getFavorites());
    }
  }, [teachers, userToken, dispatch]);

  return (
    <>
      {favorites.length === 0 && !isLoading && teachers && isRefreshing && (
        <p className={styles.emptyText}>
          List of favorite teachers is empty 😭
        </p>
      )}

      {favorites.length > 0 && (
        <ul className={styles.teachersList}>
          {favorites.map((teacher) => (
            <Card key={teacher._id} data={teacher} />
          ))}{" "}
        </ul>
      )}
    </>
  );
}
