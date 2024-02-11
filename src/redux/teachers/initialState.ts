import { TeacherProps } from "@/components/card/card";

export interface InitialState {
  teachers: TeacherProps[];
  favorites: TeacherProps[];
  filter: {
    languages: string;
    levels: string;
    price: string;
  };
  isLoading: boolean;
  error: string | null | unknown;
  pagination: {
    perPage: Readonly<number>;
    page: number;
  };
}

export const initialState: InitialState = {
  teachers: [],
  favorites: [],
  filter: {
    languages: "",
    levels: "",
    price: "",
  },
  isLoading: false,
  error: null,
  pagination: {
    perPage: 3,
    page: 0,
  },
};
