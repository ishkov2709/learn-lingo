import * as Yup from "yup";

const namePattern = /^[a-zA-Z0-9]*$/;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$|^\$2[aby]\$[0-9]{2}\$[./A-Za-z0-9]{53}$/;
const fullNamePattern = /^[a-z,',-]+(\s)[a-z,',-]+$/i;
const phoneNumberPattern =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .matches(
      namePattern,
      "Name must be lowercase or uppercase Latin letters or numbers"
    )
    .required(),
  email: Yup.string().matches(emailPattern, "Email is not valid").required(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(
      passwordPattern,
      "Password must contain uppercase and lowercase Latin letters, numbers and special characters"
    )
    .required(),
});

export const loginSchema = Yup.object({
  email: Yup.string().matches(emailPattern, "Email is not valid").required(),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(
      passwordPattern,
      "Password must contain uppercase and lowercase Latin letters, numbers and special characters"
    )
    .required(),
});

export const bookSchema = Yup.object({
  picked: Yup.string().required(),
  fullName: Yup.string()
    .matches(fullNamePattern, "Full Name is not valid")
    .required(),
  email: Yup.string().matches(emailPattern, "Eamil is not valid").required(),
  phoneNumber: Yup.string()
    .matches(phoneNumberPattern, "Phone Number is not valid")
    .required(),
});
