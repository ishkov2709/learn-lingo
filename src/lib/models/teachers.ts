import Joi from "joi";
import mongoose from "mongoose";
import { emailPattern } from "./users";

const { Schema } = mongoose;

const fullNamePattern = /^[a-z,',-]+(\s)[a-z,',-]+$/i;
const phoneNumberPattern =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const teacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    languages: {
      type: Array,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Array,
      required: true,
    },
    price_per_hour: {
      type: Number,
      required: true,
    },
    lessons_done: {
      type: Number,
      required: true,
    },
    avatar_url: {
      type: String,
      required: true,
    },
    lesson_info: {
      type: String,
      required: true,
    },
    conditions: {
      type: Array,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    favorites: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
  },
  { timestamps: false }
);

export const bookSchema = Joi.object({
  picked: Joi.string().valid("one", "two", "three", "four", "five").required(),
  fullName: Joi.string().required().pattern(fullNamePattern),
  email: Joi.string().required().pattern(emailPattern),
  phoneNumber: Joi.string().required().pattern(phoneNumberPattern),
}).messages({ "string.pattern.base": "{#label} in not valid" });

export default mongoose.models.Teacher ||
  mongoose.model("Teacher", teacherSchema);
