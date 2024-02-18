"use client";

import { Field, Form, Formik, FormikHelpers } from "formik";
import styles from "./styles.module.css";
import clsx from "clsx";
import Image from "next/image";
import { TeacherProps } from "../card/card";
import BookRadios, { Picked } from "../book-radios/book-radios";
import useAllSelectors from "@/utils/useAllSelectors";
import { useEffect, useRef, useState } from "react";
import { getTeacher } from "@/utils/getTeacher";
import { bookLesson } from "@/redux/teachers/thunk";
import { useAppDispatch } from "@/redux/hooks";
import { bookSchema } from "@/utils/validationSchemas";
import { notifyLesson } from "@/utils/notify";
import { FaArrowCircleDown } from "react-icons/fa";

export interface BookValues {
  picked: Picked | "";
  fullName: string;
  email: string;
  phoneNumber: string;
}

export default function BookForm({ id }: { id: string }) {
  const { currentTheme } = useAllSelectors();
  const [teacher, setTeacher] = useState<TeacherProps | null>(null);
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.addEventListener("scroll", () => setVisible(false));
    }
  }, [formRef]);

  useEffect(() => {
    (async () => {
      const res = await getTeacher(id);
      setTeacher(res);
    })();
  }, [id]);

  return (
    <div className={styles.formWrapper} ref={formRef}>
      <h1 className={styles.title}>Book trial lesson</h1>
      <p className={styles.text}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>

      <div className={styles.teacherBox}>
        {teacher && (
          <>
            <Image
              src={teacher.avatar_url}
              alt={`${teacher.name} ${teacher.surname}`}
              width={44}
              height={44}
              className={styles.teacherPhoto}
            />
            <div>
              <p className={styles.sign}>Your teacher</p>
              <p className={styles.teachersName}>
                {`${teacher.name} ${teacher.surname}`}
              </p>
            </div>
          </>
        )}
      </div>

      {isVisible && (
        <FaArrowCircleDown size={32} className={styles.arrowDown} />
      )}

      <Formik
        initialValues={{
          picked: "",
          fullName: "",
          email: "",
          phoneNumber: "",
        }}
        validationSchema={bookSchema}
        onSubmit={(
          values: BookValues,
          { resetForm }: FormikHelpers<BookValues>
        ) => {
          const bookData = {
            id,
            book: {
              ...values,
            },
          };
          dispatch(bookLesson(bookData));
          resetForm();
          notifyLesson();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <b id="reason-radio-group" className={styles.question}>
              What is your main reason for learning a language?
            </b>
            {errors.picked && touched.picked && (
              <p className={styles.textError}>{errors.picked}</p>
            )}
            <BookRadios />
            {errors.fullName && touched.fullName && (
              <p className={styles.textError}>{errors.fullName}</p>
            )}
            <label className={styles.label}>
              <Field
                className={styles.field}
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Full Name"
              />
            </label>
            {errors.email && touched.email && (
              <p className={styles.textError}>{errors.email}</p>
            )}
            <label className={styles.label}>
              <Field
                className={styles.field}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
              />
            </label>
            {errors.phoneNumber && touched.phoneNumber && (
              <p className={styles.textError}>{errors.phoneNumber}</p>
            )}
            <label className={styles.label}>
              <Field
                className={styles.field}
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
              />
            </label>

            <button
              className={clsx(styles.btnSubmit, styles[currentTheme])}
              type="submit"
              disabled={Boolean(!teacher)}
            >
              Book
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
