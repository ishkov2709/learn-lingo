import { useAppSelector } from "@/redux/hooks";

const useAllSelectors = () => {
  const currentTheme = useAppSelector((state) => state.themes.currentTheme);
  const teachers = useAppSelector((state) => state.teachers.teachers);
  const filter = useAppSelector((state) => state.teachers.filter);
  const error = useAppSelector((state) => state.teachers.error);
  const isLoading = useAppSelector((state) => state.teachers.isLoading);
  const pagination = useAppSelector((state) => state.teachers.pagination);
  const user = useAppSelector((state) => state.user);
  const userId = useAppSelector((state) => state.user.id);
  const userError = useAppSelector((state) => state.user.error);
  const userEmail = useAppSelector((state) => state.user.email);
  const userSuccess = useAppSelector((state) => state.user.success);
  const userToken = useAppSelector((state) => state.user.token);
  const isRefreshing = useAppSelector((state) => state.user.isRefreshing);
  const favorites = useAppSelector((state) => state.teachers.favorites);

  return {
    currentTheme,
    teachers,
    favorites,
    filter,
    error,
    isLoading,
    pagination,
    user,
    userId,
    userError,
    userEmail,
    userSuccess,
    userToken,
    isRefreshing,
  };
};

export default useAllSelectors;
