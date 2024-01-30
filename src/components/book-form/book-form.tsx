import { Field, Form, Formik, FormikHelpers } from "formik";
import styles from "./styles.module.css";
import clsx from "clsx";
import data from "../../../teachers.json";
import Image from "next/image";
import { TeacherProps } from "../card/card";
import { useAppSelector } from "@/redux/hooks";

enum Picked {
  One = "one",
  Two = "two",
  Three = "three",
  Four = "four",
  Five = "five",
}

interface Values {
  picked: Picked | "";
  email: string;
  password: string;
}

export default function BookForm({ id }: { id: string }) {
  const currentTheme = useAppSelector((state) => state.themes.currentTheme);
  const teacher: TeacherProps = data[Number(id)];

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Book trial lesson</h1>
      <p className={styles.text}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>

      <div className={styles.teacherBox}>
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
      </div>

      <Formik
        initialValues={{
          picked: "",
          email: "",
          password: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <b id="reason-radio-group" className={styles.question}>
            What is your main reason for learning English?
          </b>
          <div
            className={styles.radioBox}
            role="group"
            aria-labelledby="reason-radio-group"
          >
            <label className={styles.radioLabel}>
              <Field type="radio" name="picked" value={Picked.One} /> Career and
              business
              <span
                className={clsx(
                  styles.customRadio,
                  styles[`${currentTheme}Radio`]
                )}
              ></span>
            </label>
            <label className={styles.radioLabel}>
              <Field type="radio" name="picked" value={Picked.Two} /> Lesson for
              kids
              <span
                className={clsx(
                  styles.customRadio,
                  styles[`${currentTheme}Radio`]
                )}
              ></span>
            </label>
            <label className={styles.radioLabel}>
              <Field type="radio" name="picked" value={Picked.Three} /> Living
              abroad
              <span
                className={clsx(
                  styles.customRadio,
                  styles[`${currentTheme}Radio`]
                )}
              ></span>
            </label>
            <label className={styles.radioLabel}>
              <Field type="radio" name="picked" value={Picked.Four} /> Exams and
              coursework
              <span
                className={clsx(
                  styles.customRadio,
                  styles[`${currentTheme}Radio`]
                )}
              ></span>
            </label>
            <label className={styles.radioLabel}>
              <Field type="radio" name="picked" value={Picked.Five} /> Culture,
              travel or hobby
              <span
                className={clsx(
                  styles.customRadio,
                  styles[`${currentTheme}Radio`]
                )}
              ></span>
            </label>
          </div>

          <label className={styles.label}>
            <Field
              className={styles.field}
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Full Name"
            />
          </label>
          <label className={styles.label}>
            <Field
              className={styles.field}
              id="email"
              name="email"
              type="email"
              placeholder="Email"
            />
          </label>
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
          >
            Sign Up
          </button>
        </Form>
      </Formik>
    </div>
  );
}
