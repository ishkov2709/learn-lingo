import clsx from "clsx";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { nextPage } from "@/redux/teachers/teachersSlice";

export default function PaginationBtn() {
  const currentTheme = useAppSelector((state) => state.themes.currentTheme);
  const teathers = useAppSelector((state) => state.teachers.teachers);
  const isLoading = useAppSelector((state) => state.teachers.isLoading);
  const error = useAppSelector((state) => state.teachers.error);
  const dispatch = useAppDispatch();

  if (teathers.length === 0 || teathers.length % 3 !== 0 || isLoading || error)
    return null;

  const handleClick = () => {
    dispatch(nextPage());
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(styles.btn, styles[currentTheme])}
      type="button"
    >
      Load more
    </button>
  );
}
