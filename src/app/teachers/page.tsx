"use client";

import Card from "@/components/card";
import { TeacherProps } from "@/components/card/card";
import FilterSelector from "@/components/filter-selector";
import PaginationBtn from "@/components/pagination-btn";
import { useAppDispatch } from "@/redux/hooks";
import {
  setLanguage,
  setLevel,
  setPrice,
} from "@/redux/teachers/teachersSlice";
import { getNextTeachers, getTeachers } from "@/redux/teachers/thunk";
import {
  DataOption,
  languageOptions,
  levelOptions,
  priceOptions,
} from "@/utils/reactSelectOptions";
import useAllSelectors from "@/utils/useAllSelectors";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const FiltersForm = dynamic(() => import("../../components/filters-form"), {
  ssr: false,
});

export default function Teachers() {
  const { teachers, filter, pagination, isLoading, error } = useAllSelectors();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch, filter]);

  useEffect(() => {
    if (pagination.page > 0) dispatch(getNextTeachers());
  }, [dispatch, pagination]);

  return (
    <>
      <main
        style={{ backgroundColor: "#F8F8F8", minHeight: "calc(100% - 88px)" }}
      >
        <section className="pt-8 pb-16">
          <div className="container">
            <div className="min-h-20 mb-8">
              <FiltersForm>
                <FilterSelector
                  label="Languages"
                  name="language"
                  width="221px"
                  data={languageOptions}
                  onChange={(newVal) =>
                    dispatch(setLanguage(newVal as DataOption))
                  }
                />
                <FilterSelector
                  label="Level of knowledge"
                  name="level"
                  width="198px"
                  data={levelOptions}
                  onChange={(newVal) =>
                    dispatch(setLevel(newVal as DataOption))
                  }
                />
                <FilterSelector
                  label="Price"
                  name="price"
                  width="124px"
                  data={priceOptions}
                  onChange={(newVal) =>
                    dispatch(setPrice(newVal as DataOption))
                  }
                />
              </FiltersForm>
            </div>
            <ul className="flex flex-col gap-8">
              {teachers.length > 0 &&
                teachers.map((teacher: TeacherProps) => (
                  <Card key={teacher._id} data={teacher} />
                ))}
              {teachers.length === 0 && !isLoading && error !== null && (
                <p className="text-center text-3xl ">
                  No teachers were found matching your request. 😥
                </p>
              )}
            </ul>

            <PaginationBtn />
          </div>
        </section>
      </main>
    </>
  );
}
