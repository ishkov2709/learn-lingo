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
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { CiFilter } from "react-icons/ci";

const FiltersForm = dynamic(
  () => import("../../components/filters-form/filters-form"),
  {
    ssr: false,
  }
);

export default function Teachers() {
  const { teachers, filter, pagination, isLoading, error } = useAllSelectors();
  const dispatch = useAppDispatch();
  const [isLoadedPage, setLoadPage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showFilter, setFilter] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (innerWidth < 768) return setIsMobile(true);
      return setIsMobile(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (!isLoadedPage || filter) {
      setLoadPage(true);
      dispatch(getTeachers());
    }
  }, [isLoadedPage, dispatch, filter]);

  useEffect(() => {
    if (pagination.page > 0 && isLoadedPage) dispatch(getNextTeachers());
  }, [dispatch, pagination, isLoadedPage]);

  return (
    <>
      <main className={styles.main}>
        <section className={styles.section}>
          <div className="container">
            {!showFilter && isMobile ? (
              <button
                type="button"
                className={styles.filterBtn}
                onClick={() => setFilter(true)}
              >
                Filter <CiFilter size={20} />
              </button>
            ) : (
              <div className={styles.filterBox}>
                <FiltersForm>
                  <FilterSelector
                    label="Languages"
                    name="language"
                    width={isMobile ? "200px" : "221px"}
                    data={languageOptions}
                    saveValue={filter.languages}
                    onChange={(newVal) =>
                      dispatch(setLanguage(newVal as DataOption))
                    }
                  />
                  <FilterSelector
                    label="Level of knowledge"
                    name="level"
                    width={isMobile ? "200px" : "198px"}
                    data={levelOptions}
                    saveValue={filter.levels}
                    onChange={(newVal) =>
                      dispatch(setLevel(newVal as DataOption))
                    }
                  />
                  <FilterSelector
                    label="Price"
                    name="price"
                    width={isMobile ? "200px" : "124px"}
                    data={priceOptions}
                    saveValue={filter.price}
                    onChange={(newVal) =>
                      dispatch(setPrice(newVal as DataOption))
                    }
                  />
                </FiltersForm>
              </div>
            )}
            <ul className={styles.teachersList}>
              {teachers.length > 0 &&
                teachers.map((teacher: TeacherProps) => (
                  <Card key={teacher._id} data={teacher} />
                ))}
              {teachers.length === 0 && !isLoading && error !== null && (
                <p className={styles.emptyText}>
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
