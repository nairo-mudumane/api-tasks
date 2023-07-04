import { ObjectId } from "mongoose";

export type IMongoData = {
  _id: ObjectId;
  createdAt: string;
  updatedAt: string;
};

export type IOmittedMongoData = "_id" | "createdAt" | "updatedAt";
