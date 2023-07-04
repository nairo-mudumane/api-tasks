import { ObjectId } from "mongoose";
import { IMongoData, IOmittedMongoData } from "./mongo";
import { ITask } from "./task";

export interface IUser extends IMongoData {
  _doc: any;
  email: string;
  name: string;
  password: string;
  tasks: Array<ObjectId | string | ITask>;
}

export type INewUser = Partial<Omit<IUser, IOmittedMongoData & "tasks">>;

export type IUserLogin = Partial<Pick<IUser, "email" | "password">>;
