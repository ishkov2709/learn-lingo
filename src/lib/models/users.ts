import Joi, { boolean } from "joi";
import mongoose from "mongoose";

const { Schema } = mongoose;

const namePattern = /^[a-zA-Z0-9]*$/;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$|^\$2[aby]\$[0-9]{2}\$[./A-Za-z0-9]{53}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      match: namePattern,
      minLength: 2,
    },
    email: {
      type: String,
      match: emailPattern,
      required: true,
    },
    password: {
      type: String,
      match: passwordPattern,
      minLength: 6,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: false }
);

export const registerSchema = Joi.object({
  name: Joi.string().required().min(2).pattern(namePattern),
  email: Joi.string().required().pattern(emailPattern),
  password: Joi.string().required().pattern(passwordPattern),
}).messages({ "string.pattern.base": "{#label} in not valid" });

export const loginSchema = Joi.object({
  email: Joi.string().required().pattern(emailPattern),
  password: Joi.string().required().pattern(passwordPattern),
}).messages({ "string.pattern.base": "{#label} in not valid" });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
