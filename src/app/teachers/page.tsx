"use client";

import { FilterSelector } from "@/components/filter-selector";
import style from "./teachers.module.css";
import teachers from "../../../teachers.json";
import { Card } from "@/components/card";

const languageOptions = [
  { value: "French", label: "French" },
  { value: "English", label: "English" },
  { value: "German", label: "German" },
  { value: "Ukrainian", label: "Ukrainian" },
  { value: "Polish", label: "Polish" },
];

const levelOptions = [
  { value: "A1 Beginner", label: "A1 Beginner" },
  { value: "A2 Elementary", label: "A2 Elementary" },
  { value: "B1 Intermediate", label: "B1 Intermediate" },
  { value: "B2 Upper-Intermediate", label: "B2 Upper-Intermediate" },
];

const priceOptions = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
  { value: "40", label: "40" },
];

export default function Teachers() {
  console.log(teachers[0]);

  return (
    <main
      style={{ backgroundColor: "#F8F8F8", minHeight: "calc(100% - 88px)" }}
    >
      <section className={style.section}>
        <div className="container">
          <form className={style.form}>
            <FilterSelector
              name="Languages"
              width="221px"
              data={languageOptions}
              onChange={(e) => {
                console.log(e);
              }}
            />
            <FilterSelector
              name="Level of knowledge"
              width="198px"
              data={levelOptions}
              onChange={(e) => {
                console.log(e);
              }}
            />
            <FilterSelector
              name="Price"
              width="124px"
              data={priceOptions}
              onChange={(e) => {
                console.log(e);
              }}
            />
          </form>
          <ul>{<Card data={teachers[0]} />}</ul>
        </div>
      </section>
    </main>
  );
}
