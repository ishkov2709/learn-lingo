import clsx from "clsx";
import styles from "../book-form/styles.module.css";
import useAllSelectors from "@/utils/useAllSelectors";
import { Field } from "formik";

export enum Picked {
  One = "one",
  Two = "two",
  Three = "three",
  Four = "four",
  Five = "five",
}

export default function BookRadios() {
  const { currentTheme } = useAllSelectors();

  return (
    <div
      className={styles.radioBox}
      role="group"
      aria-labelledby="reason-radio-group"
    >
      <label className={styles.radioLabel}>
        <Field type="radio" name="picked" value={Picked.One} /> Career and
        business
        <span
          className={clsx(styles.customRadio, styles[`${currentTheme}Radio`])}
        ></span>
      </label>
      <label className={styles.radioLabel}>
        <Field type="radio" name="picked" value={Picked.Two} /> Lesson for kids
        <span
          className={clsx(styles.customRadio, styles[`${currentTheme}Radio`])}
        ></span>
      </label>
      <label className={styles.radioLabel}>
        <Field type="radio" name="picked" value={Picked.Three} /> Living abroad
        <span
          className={clsx(styles.customRadio, styles[`${currentTheme}Radio`])}
        ></span>
      </label>
      <label className={styles.radioLabel}>
        <Field type="radio" name="picked" value={Picked.Four} /> Exams and
        coursework
        <span
          className={clsx(styles.customRadio, styles[`${currentTheme}Radio`])}
        ></span>
      </label>
      <label className={styles.radioLabel}>
        <Field type="radio" name="picked" value={Picked.Five} /> Culture, travel
        or hobby
        <span
          className={clsx(styles.customRadio, styles[`${currentTheme}Radio`])}
        ></span>
      </label>
    </div>
  );
}
