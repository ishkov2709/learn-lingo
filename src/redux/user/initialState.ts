export interface InitialState {
  id: string | null;
  name: string | null;
  email: string | null | undefined;
  token: string | null;
  error: string | null | unknown;
  success: boolean | null;
  isLoading: boolean;
  isRefreshing: boolean;
}

export const initialState: InitialState = {
  id: null,
  name: null,
  email: "",
  token: null,
  error: null,
  success: null,
  isLoading: false,
  isRefreshing: false,
};
