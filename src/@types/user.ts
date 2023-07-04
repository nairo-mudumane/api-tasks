import { IMongoData, IOmittedMongoData } from "./mongo";

export interface IUser extends IMongoData {
  email: string;
  name: string;
  password: string;
}

export type INewUser = Partial<Omit<IUser, IOmittedMongoData>>;
