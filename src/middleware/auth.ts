import { Request, Response, NextFunction } from "express";
import { DEFAULT_ERROR_MESSAGES } from "../constants";
import helpers from "../helpers";
import { IAuthRequest, IUser } from "../@types";
import { userModel } from "../schemas";

type IRouteType = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<any>;

export class AuthFirewall {
  public Private: IRouteType;
  private static errorStatusCode = 401;
  private static unknownOrigin = DEFAULT_ERROR_MESSAGES.unknownOriginOrUser;
  private static invalidTokenStructure =
    DEFAULT_ERROR_MESSAGES.invalidOrExpiredToken;

  constructor() {
    this.Private = this.usePrivateAuth;
  }

  private async usePrivateAuth(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const authHeader = request.headers.authorization;
    if (!authHeader)
      return response
        .status(AuthFirewall.errorStatusCode)
        .json({ message: AuthFirewall.invalidTokenStructure });

    const parts = authHeader.split(" ");
    if (parts.length !== 2)
      return response
        .status(AuthFirewall.errorStatusCode)
        .json({ message: AuthFirewall.invalidTokenStructure });

    const [scheme, token] = parts;
    if (!/^Niteki$/i.test(scheme))
      return response
        .status(AuthFirewall.errorStatusCode)
        .json({ message: AuthFirewall.invalidTokenStructure });

    return helpers.jwt.verifyJWT(token, async (err, decoded) => {
      if (err)
        return response
          .status(AuthFirewall.errorStatusCode)
          .json({ message: err.message });

      if (!decoded)
        return response
          .status(AuthFirewall.errorStatusCode)
          .json({ message: AuthFirewall.unknownOrigin });

      let user: IUser | null = null;
      user = await userModel.findOne({ _id: decoded._id });

      if (!user)
        return response
          .status(AuthFirewall.errorStatusCode)
          .json({ message: AuthFirewall.unknownOrigin });

      (request as IAuthRequest)["user"] = {
        _id: String(user._id),
        email: user.email,
      };

      return next();
    });
  }
}
