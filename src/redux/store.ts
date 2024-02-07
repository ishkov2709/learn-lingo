import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { themesReducer } from "./themes/themesSlice";
import { teachersReducer } from "./teachers/teachersSlice";
import { userReducer } from "./user/userSlice";

const rootReducer = combineReducers({
  themes: themesReducer,
  teachers: teachersReducer,
  user: userReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
