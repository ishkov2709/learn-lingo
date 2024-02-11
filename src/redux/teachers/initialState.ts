import { TeacherProps } from "@/components/card/card";

export interface InitialState {
  teachers: TeacherProps[];
  favorites: TeacherProps[];
  filter: {
    languages: string | null;
    levels: string | null;
    price: string | null;
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
    languages: null,
    levels: null,
    price: null,
  },
  isLoading: false,
  error: null,
  pagination: {
    perPage: 3,
    page: 0,
  },
};
