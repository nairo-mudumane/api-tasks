import { IMongoData, IOmittedMongoData } from "./mongo";

export interface IUser extends IMongoData {
  _doc: any;
  email: string;
  name: string;
  password: string;
}

export type INewUser = Partial<Omit<IUser, IOmittedMongoData>>;

export type IUserLogin = Partial<Pick<IUser, "email" | "password">>;
