import { Response } from "express";
import { IAuthRequest, INewTask, IUser } from "../../@types";
import helpers from "../../helpers";
import { taskModel, userModel } from "../../schemas";
import { DEFAULT_ERROR_MESSAGES } from "../../constants";

export async function create(request: IAuthRequest, response: Response) {
  const payload = request.body as INewTask;
  const reqUser = request.user;
  let user: IUser | null = null;

  try {
    helpers.task.create(payload);

    user = await userModel.findOne(reqUser);
    if (!user) throw new Error(DEFAULT_ERROR_MESSAGES.unknownOriginOrUser);
  } catch (error) {
    return response.status(400).json({ message: (error as Error).message });
  }

  try {
    const created = await taskModel.create({ createdBy: user._id, ...payload });
    await userModel.findByIdAndUpdate(user._id, { $push: created._id });

    return response
      .status(201)
      .json({ message: "ok", data: { _id: created._id } });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
