"use client";

import { TailSpin } from "react-loader-spinner";

export default function Page() {
  return (
    <main className="centeredWrapper">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </main>
  );
}
