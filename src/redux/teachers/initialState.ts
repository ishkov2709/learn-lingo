import { TeacherProps } from "@/components/card/card";

interface InitialState {
  teachers: TeacherProps[];
  filter: {
    language: string;
    level: string;
    price: string;
  };
  isLoading: boolean;
  error: string | null | unknown;
}

export const initialState: InitialState = {
  teachers: [],
  filter: {
    language: "",
    level: "",
    price: "",
  },
  isLoading: false,
  error: null,
};
