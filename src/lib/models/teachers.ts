import Joi from "joi";
import mongoose from "mongoose";

const { Schema } = mongoose;

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
    },
  },
  { timestamps: false }
);

export const favoriteSchema = Joi.object({
  id: Joi.string().required(),
});

export default mongoose.models.Teacher ||
  mongoose.model("Teacher", teacherSchema);
