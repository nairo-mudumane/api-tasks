import type { Request } from "express";

type _IUser = { _id: string; email: string };

export interface IAuthRequest extends Request {
  user?: _IUser;
}
