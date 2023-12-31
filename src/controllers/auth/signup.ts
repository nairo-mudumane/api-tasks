import { Request, Response } from "express";
import { INewUser } from "../../@types";
import helpers from "../../helpers";
import { userModel } from "../../schemas";
import { DEFAULT_ERROR_MESSAGES } from "../../constants";

export async function signup(request: Request, response: Response) {
  const payload = request.body as INewUser;

  try {
    helpers.user.signup(payload);

    const exists = await userModel.findOne({ email: payload.email });
    if (exists) throw new Error(DEFAULT_ERROR_MESSAGES.userAlreadyRegistered);
  } catch (error) {
    return response.status(400).json({ message: (error as Error).message });
  }

  try {
    const { email, name, password } = payload;
    const hashedPassword = await helpers.password.hash(password!);

    const created = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    created.password = undefined as unknown as string;
    created.tasks = undefined as unknown as Array<string>;

    const token = helpers.jwt.getJWT(
      { _id: String(created._id), email: created.email },
      { expiresIn: "24h" }
    );

    return response
      .status(201)
      .json({ message: "ok", data: { ...created._doc, token } });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
