import { Schema } from "mongoose";
import { ITask } from "../@types/task";

const schema = new Schema<ITask>(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    createdBy: {
      ref: "users",
      required: true,
      type: Schema.Types.ObjectId,
    },
    completeAt: {
      type: Date,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
