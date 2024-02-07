"use client";

import clsx from "clsx";
import styles from "./styles.module.css";
import useAllSelectors from "@/utils/useAllSelectors";
import { FaRegEye } from "react-icons/fa";
import { registerUser } from "@/redux/user/thunk";
import { FaRegEyeSlash } from "react-icons/fa";
import { registerSchema } from "@/utils/validationSchemas";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { notifyError, notifySuccess } from "@/utils/notify";
import { Field, Form, Formik, FormikHelpers } from "formik";

export interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const [isShow, setShow] = useState<boolean>(false);
  const { currentTheme } = useAllSelectors();
  const dispatch = useAppDispatch();
  const {
    user: { email, error, success },
  } = useAllSelectors();

  useEffect(() => {
    if (email && success) notifySuccess(email);
  }, [email, success]);

  useEffect(() => {
    if (error) notifyError();
  }, [error]);

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
        validationSchema={registerSchema}
        onSubmit={(
          values: RegisterValues,
          { setSubmitting }: FormikHelpers<RegisterValues>
        ) => {
          dispatch(registerUser(values));

          setSubmitting(true);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {errors.name && touched.name && (
              <p className={styles.textError}>{errors.name}</p>
            )}
            <label className={styles.label}>
              <Field
                className={styles.field}
                id="name"
                name="name"
                placeholder="Name"
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
            {errors.password && touched.password && (
              <p className={styles.textError}>{errors.password}</p>
            )}
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
              disabled={Boolean(errors.name || errors.email || errors.password)}
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
