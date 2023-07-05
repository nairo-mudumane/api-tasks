import { Request, Response } from "express";
import { IUserLogin } from "../../@types";
import { userModel } from "../../schemas";
import helpers from "../../helpers";

export async function login(request: Request, response: Response) {
  const errorMessage = "e-mail ou senha incorretos";
  const { email, password } = request.body as IUserLogin;

  try {
    if (!email || !password) throw new Error(errorMessage);

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) throw new Error(errorMessage);

    if (!(await helpers.password.match(password, user.password)))
      throw new Error(errorMessage);

    user.password = undefined as unknown as string;
    const data = { _id: String(user._id), email: user.email };
    const token = helpers.jwt.getJWT(data, { expiresIn: "24h" });

    return response
      .status(200)
      .json({ message: "ok", data: { ...user._doc, token } });
  } catch (error) {
    return response.status(403).json({ message: (error as Error).message });
  }
}
