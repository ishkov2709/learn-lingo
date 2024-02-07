import * as Yup from "yup";

const namePattern = /^[a-zA-Z0-9]*$/;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$|^\$2[aby]\$[0-9]{2}\$[./A-Za-z0-9]{53}$/;

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, "name must be at least 2 characters")
    .matches(
      namePattern,
      "name must be lowercase or uppercase Latin letters or numbers"
    )
    .required(),
  email: Yup.string().matches(emailPattern, "email is not valid").required(),
  password: Yup.string()
    .min(6, "password must be at least 6 characters long")
    .matches(
      passwordPattern,
      "password must contain uppercase and lowercase Latin letters, numbers and special characters"
    )
    .required(),
});
