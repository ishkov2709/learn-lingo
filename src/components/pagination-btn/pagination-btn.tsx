import clsx from "clsx";
import styles from "./styles.module.css";
import { useAppDispatch } from "@/redux/hooks";
import { nextPage } from "@/redux/teachers/teachersSlice";
import useAllSelectors from "@/utils/useAllSelectors";

export default function PaginationBtn() {
  const { currentTheme, teachers, isLoading, error } = useAllSelectors();
  const dispatch = useAppDispatch();

  if (teachers.length === 0 || teachers.length % 3 !== 0 || isLoading || error)
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
