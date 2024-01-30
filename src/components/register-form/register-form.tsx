import { Field, Form, Formik, FormikHelpers } from "formik";
import styles from "./styles.module.css";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import clsx from "clsx";

interface Values {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const [isShow, setShow] = useState<boolean>(false);
  const currentTheme = useAppSelector((state) => state.themes.currentTheme);

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Registration</h1>
      <p className={styles.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>
      <Formik
        initialValues={{
          name: "",
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
          <label className={styles.label}>
            <Field
              className={styles.field}
              id="name"
              name="name"
              placeholder="Name"
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
            {isShow ? (
              <FaRegEye
                size={20}
                className={styles.showIcon}
                onClick={() => setShow(!isShow)}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className={styles.showIcon}
                onClick={() => setShow(!isShow)}
              />
            )}
            <Field
              className={styles.field}
              id="password"
              name="password"
              type={isShow ? "text" : "password"}
              placeholder="Password"
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
