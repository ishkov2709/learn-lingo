import { useAppSelector } from "@/redux/hooks";

const useAllSelectors = () => {
  const currentTheme = useAppSelector((state) => state.themes.currentTheme);
  const teachers = useAppSelector((state) => state.teachers.teachers);
  const filter = useAppSelector((state) => state.teachers.filter);
  const error = useAppSelector((state) => state.teachers.error);
  const isLoading = useAppSelector((state) => state.teachers.isLoading);
  const pagination = useAppSelector((state) => state.teachers.pagination);
  const user = useAppSelector((state) => state.user);
  const userError = useAppSelector((state) => state.user.error);
  const userEmail = useAppSelector((state) => state.user.email);
  const userSuccess = useAppSelector((state) => state.user.success);

  return {
    currentTheme,
    teachers,
    filter,
    error,
    isLoading,
    pagination,
    user,
    userError,
    userEmail,
    userSuccess,
  };
};

export default useAllSelectors;
