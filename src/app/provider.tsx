"use client";

import { AppStore, makeStore } from "@/redux/store";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storageRef = useRef<AppStore>();

  if (!storageRef.current) {
    storageRef.current = makeStore();
  }

  return <Provider store={storageRef.current}>{children}</Provider>;
}
