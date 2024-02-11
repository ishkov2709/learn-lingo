"use client";

import useAllSelectors from "@/utils/useAllSelectors";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Card from "../card";
import { getFavorites } from "@/redux/teachers/thunk";
import { useAppDispatch } from "@/redux/hooks";

export default function FavoritesList() {
  const { teachers, favorites, isLoading, error, userToken } =
    useAllSelectors();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userToken) redirect("/");
  });

  useEffect(() => {
    if (teachers) {
      dispatch(getFavorites());
    }
  }, [teachers, dispatch]);

  if (favorites.length === 0 && !isLoading && !error)
    return (
      <p className="text-center text-3xl">
        List of favorite teachers is empty 😭
      </p>
    );
  if (favorites.length > 0)
    return (
      <ul>
        {favorites.map((teacher) => (
          <Card key={teacher._id} data={teacher} />
        ))}{" "}
      </ul>
    );
}
