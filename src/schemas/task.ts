import { Schema, model } from "mongoose";
import { ITask } from "../@types";

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
      select: false,
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

export const taskModel = model<ITask>("tasks", schema);
