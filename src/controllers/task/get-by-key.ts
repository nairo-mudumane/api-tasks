import { Response } from "express";
import { IAuthRequest, ITask, ITaskParams, IUser } from "../../@types";
import { taskModel, userModel } from "../../schemas";
import { DEFAULT_ERROR_MESSAGES } from "../../constants";
import { isValidObjectId } from "mongoose";

export async function getByKey(request: IAuthRequest, response: Response) {
  const params = request.params as ITaskParams;
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
      task = await taskModel.findOne({ _id: params.key, createdBy: user._id });
    else
      task = await taskModel.findOne({
        name: decodeURI(params.key),
        createdBy: user._id,
      });

    if (!task)
      return response
        .status(404)
        .json({ message: DEFAULT_ERROR_MESSAGES.notFound });

    return response.status(200).json({ message: "ok", data: task });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
