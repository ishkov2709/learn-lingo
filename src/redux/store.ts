import { configureStore } from "@reduxjs/toolkit";
import { themesReducer } from "./themes/themesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      themes: themesReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
