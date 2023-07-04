import jwt, { SignOptions } from "jsonwebtoken";
import { IGetJWTPayload, IVerifyCallback } from "../@types";

function getJWT(data: IGetJWTPayload, options?: SignOptions): string {
  const token = jwt.sign(data, process.env.SECRET_HAS!, { ...options });
  return token;
}

function verifyJWT(token: string, callback: IVerifyCallback): void {
  jwt.verify(token, process.env.SECRET_HAS!, (err, decoded) => {
    if (err) callback(err, null);
    else callback(null, decoded as IGetJWTPayload);
  });
}

export default { getJWT, verifyJWT };
