import jwt, { SignOptions } from "jsonwebtoken";
import { IGetJWTPayload, IVerifyCallback } from "../@types";

/**
 * Synchronously sign the given payload into a JSON Web Token string
 * @param data Payload to sign, could be an literal, buffer or string secretOrPrivateKey - Either the secret for HMAC algorithms, or the PEM encoded private key for RSA and ECDSA. [options]
 * @param options Options for the signature returns
 * @returns The JSON Web Token string
 */
const getJWT = (data: IGetJWTPayload, options?: SignOptions) =>
  jwt.sign(data, process.env.SECRET_HAS!, { ...options });

/**
 * Asynchronously verify given token using a secret or a public key to get a decoded token
 * @param token JWT string to verify
 * @param callback Callback to get the decoded token on
 */
function verifyJWT(token: string, callback: IVerifyCallback): void {
  jwt.verify(token, process.env.SECRET_HAS!, (err, decoded) => {
    if (err) callback(err, null);
    else callback(null, decoded as IGetJWTPayload);
  });
}

export default { getJWT, verifyJWT };
