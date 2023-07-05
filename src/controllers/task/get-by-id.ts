import { Response } from "express";
import { IAuthRequest, ITask, IUser } from "../../@types";
import { taskModel, userModel } from "../../schemas";
import { DEFAULT_ERROR_MESSAGES } from "../../constants";
import { isValidObjectId } from "mongoose";

type IParams = { key: string };

export async function getById(request: IAuthRequest, response: Response) {
  const params = request.params as IParams;
  const reqUser = request.user;
  let user: IUser | null = null;
  let task: ITask | null = null;

  try {
    user = await userModel.findOne(reqUser);
    if (!user)
      return response
        .status(400)
        .json({ message: DEFAULT_ERROR_MESSAGES.unknownOriginOrUser });

    if (isValidObjectId(params.key))
      task = await taskModel.findById(params.key);
    else task = await taskModel.findOne({ name: decodeURI(params.key) });

    if (!task)
      return response
        .status(404)
        .json({ message: DEFAULT_ERROR_MESSAGES.notFound });

    return response.status(200).json({ message: "ok", data: task });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
