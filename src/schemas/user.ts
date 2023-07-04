import { model, Schema } from "mongoose";
import { IUser } from "../@types";

const schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const userModel = model<IUser>("users", schema);
