import { ObjectId } from "mongoose";
import { IUser } from "./user";
import { IMongoData, IOmittedMongoData } from "./mongo";

export interface ITask extends IMongoData {
  createdBy: ObjectId | string | IUser;
  category: string;
  name: string;
  description: string | null;
  completeAt: Date | null;
  isDone: boolean;
}

type Omitted = "createdBy" | "isDone";

export type INewTask = Partial<Omit<ITask, Omitted | IOmittedMongoData>>;

export interface IUpdateTask
  extends Partial<Omit<ITask, Omitted | IOmittedMongoData>> {
  isDone?: boolean;
}

export type ITaskParams = { key: string };
