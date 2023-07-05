import { ObjectId, SortOrder } from "mongoose";

export type IMongoData = {
  _id: ObjectId;
  createdAt: string;
  updatedAt: string;
};

export type IOmittedMongoData = "_id" | "createdAt" | "updatedAt";

export type ISortOder = { [key: string]: SortOrder | { $meta: "textScore" } };
