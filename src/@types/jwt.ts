import { VerifyErrors } from "jsonwebtoken";

export type IGetJWTPayload = { [key: string]: string | number };

export type IVerifyCallback = (
  err: VerifyErrors | null,
  decoded: IGetJWTPayload | null
) => void;
