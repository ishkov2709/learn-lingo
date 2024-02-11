"use client";

import clsx from "clsx";
import styles from "../register-form/styles.module.css";
import { FaRegEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import { loginSchema } from "@/utils/validationSchemas";
import { FaRegEyeSlash } from "react-icons/fa";
import { useAppDispatch } from "@/redux/hooks";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { loginUser } from "@/redux/user/thunk";
import useAllSelectors from "@/utils/useAllSelectors";
import { notifyError } from "@/utils/notify";
import { resetStates } from "@/redux/user/userSlice";
import { redirect } from "next/navigation";

export interface LoginValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [isShow, setShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { userToken, userError, currentTheme } = useAllSelectors();
  useEffect(() => {
    if (userToken) {
      redirect("/");
    }
  }, [userToken, dispatch]);

  useEffect(() => {
    if (typeof userError === "string") {
      notifyError(userError);
      dispatch(resetStates());
    }
  }, [userError, dispatch]);

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Log In</h1>
      <p className={styles.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(
          values: LoginValues,
          { resetForm }: FormikHelpers<LoginValues>
        ) => {
          dispatch(loginUser(values));

          resetForm();

          dispatch(resetStates());
        }}
      >
        {({ errors, touched }) => (
          <Form>
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
              disabled={Boolean(errors.email || errors.password)}
            >
              Log In
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
