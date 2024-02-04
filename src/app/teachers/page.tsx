"use client";

import Card from "@/components/card";
import { TeacherProps } from "@/components/card/card";
import FilterSelector, { DataOption } from "@/components/filter-selector";
import PaginationBtn from "@/components/pagination-btn";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setLanguage,
  setLevel,
  setPrice,
} from "@/redux/teachers/teachersSlice";
import { getNextTeachers, getTeachers } from "@/redux/teachers/thunk";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const FiltersForm = dynamic(() => import("../../components/filters-form"), {
  ssr: false,
});

const languageOptions = [
  { value: "", label: "All" },
  { value: "French", label: "French" },
  { value: "English", label: "English" },
  { value: "German", label: "German" },
  { value: "Ukrainian", label: "Ukrainian" },
  { value: "Polish", label: "Polish" },
];

const levelOptions = [
  { value: "", label: "All" },
  { value: "A1 Beginner", label: "A1 Beginner" },
  { value: "A2 Elementary", label: "A2 Elementary" },
  { value: "B1 Intermediate", label: "B1 Intermediate" },
  { value: "B2 Upper-Intermediate", label: "B2 Upper-Intermediate" },
];

const priceOptions = [
  { value: "", label: "All" },
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
  { value: "40", label: "40" },
];

export default function Teachers() {
  const teachers = useAppSelector((state) => state.teachers.teachers);
  const filter = useAppSelector((state) => state.teachers.filter);
  const pagination = useAppSelector((state) => state.teachers.pagination);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch, filter]);

  useEffect(() => {
    if (pagination.page > 0) dispatch(getNextTeachers());
  }, [dispatch, pagination]);

  return (
    <>
      <div className="min-h-20 mb-8">
        <FiltersForm>
          <FilterSelector
            label="Languages"
            name="language"
            width="221px"
            data={languageOptions}
            onChange={(newVal) => dispatch(setLanguage(newVal as DataOption))}
          />
          <FilterSelector
            label="Level of knowledge"
            name="level"
            width="198px"
            data={levelOptions}
            onChange={(newVal) => dispatch(setLevel(newVal as DataOption))}
          />
          <FilterSelector
            label="Price"
            name="price"
            width="124px"
            data={priceOptions}
            onChange={(newVal) => dispatch(setPrice(newVal as DataOption))}
          />
        </FiltersForm>
      </div>
      <ul className="flex flex-col gap-8">
        {teachers.length > 0 ? (
          teachers.map((teacher: TeacherProps) => (
            <Card key={teacher._id} data={teacher} />
          ))
        ) : (
          <p className="text-center text-3xl ">
            No teachers were found matching your request. 😥
          </p>
        )}
      </ul>

      <PaginationBtn />
    </>
  );
}
