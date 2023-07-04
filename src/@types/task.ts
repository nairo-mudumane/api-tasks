import { ObjectId } from "mongoose";
import { IUser } from "./user";

export type ITask = {
  createdBy: ObjectId | string | IUser;
  category: string;
  name: string;
  description: string | null;
  completeAt: Date | null;
  isDone: boolean;
};

type Omitted = "createdBy" | "isDone";

export type INewTask = Partial<Omit<ITask, Omitted>>;
