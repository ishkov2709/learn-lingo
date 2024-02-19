"use client";

import { TbError404 } from "react-icons/tb";
import { GiAutoRepair } from "react-icons/gi";
import styles from "./teachers/styles.module.css";
import BtnLink from "@/components/btn-link";

export default function Page() {
  return (
    <main>
      <section className={styles.section}>
        <div className="container nofFoundContainer">
          <div className="flexContainer">
            <TbError404 size={104} />
            <GiAutoRepair size={72} />
          </div>
          <p>Page Not Found</p>

          <BtnLink href="/home">Return to Home Page</BtnLink>
        </div>
      </section>
    </main>
  );
}
